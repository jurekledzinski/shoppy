'use client';
import styles from './Aside.module.css';
import { AsideProps } from './types';
import { controlAside, showToast } from '@/helpers';
import { extendGuestSession, guestCheckout } from '@/actions';
import { startTransition, useActionState, useCallback, useEffect } from 'react';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';
import {
  useActionStateAndReset,
  useLoadResetPasswordForm,
  useSetUserSession,
} from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionUser } from '@/store/session';

import {
  CartPanel,
  ContactPanel,
  ForgetPasswordPanel,
  MenuPanel,
  LoginPanel,
  RegisterPanel,
  ResetPasswordPanel,
  ProccedCheckoutPanel,
} from '@/components/pages';
import { ModalWarning } from '../modal-warning';

export const Aside = ({ cartData, guestId, userData }: AsideProps) => {
  const context = useAside();
  const sessionUser = useSessionUser();
  const actionElement = context.type;
  const stateOpen = context.value;
  const optionCheckout = context.checkout;
  const userId = userData?._id ?? '';
  const userName = userData?.name ?? '';
  const searchParams = useSearchParams();
  const paramActionType = searchParams.get('action_type');
  const guestUserExpire = searchParams.get('guest-user-expired');
  const router = useRouter();
  const { dispatch, state } = useCart();

  const [stateExtendGuestSession, formAction, isPending] = useActionState(
    extendGuestSession,
    {
      message: '',
      success: false,
    }
  );

  const { action, resetStateAction } = useActionStateAndReset({
    fnAction: guestCheckout,
    onResetAction: () => {
      context.onChange(actionElement, false);
      setTimeout(() => {
        router.replace('/shipping');
      }, 200);
    },
  });

  useEffect(() => {
    if (action.state.success && !action.isPending) {
      resetStateAction();
    }
  }, [action, resetStateAction]);

  useLoadResetPasswordForm({ context, paramActionType });

  useSetUserSession({
    guestId,
    sessionUser,
    userId,
    onLoggedGuest: useCallback(
      (guestId) => {
        sessionUser.onSetValue('guestUser', guestId);
      },
      [sessionUser]
    ),
    onNotLoggedGuest: useCallback(() => {
      sessionUser.onSetValue('guestUser', null);
    }, [sessionUser]),
    onLoggedUser: useCallback(
      (userId) => {
        sessionUser.onSetValue('userSession', userId);
      },
      [sessionUser]
    ),
    onNotLoggedUser: useCallback(() => {
      sessionUser.onSetValue('userSession', null);
    }, [sessionUser]),
  });

  useEffect(() => {
    if (cartData) {
      dispatch({ type: 'SET_CART', payload: cartData });
    }
  }, [cartData, dispatch]);

  return (
    <>
      <ModalWarning
        isPending={isPending}
        isOpen={guestUserExpire === 'true'}
        isSuccess={stateExtendGuestSession.success && !isPending}
        title="Session Expired"
        confirm="Click to extend your guest session"
        onConfirm={() => {
          startTransition(() => formAction(new FormData()));
        }}
      >
        <p>
          Your guest session will expire in 15 minutes. Please click extend
          session button to stay logged in as guest user.
        </p>
      </ModalWarning>
      <aside
        className={`${styles.aside} ${
          context.value ? styles.show : styles.aside
        }`}
      >
        {context.type === 'menu' ? (
          <MenuPanel
            actionElement={actionElement}
            context={context}
            stateOpen={stateOpen}
            user={{ id: userId, name: userName }}
            onSuccessAction={() => router.replace(window.location.pathname)}
          />
        ) : context.type === 'cart' ? (
          <CartPanel
            actionElement={actionElement}
            context={context}
            data={state}
            dispatch={dispatch}
            guestId={guestId}
            onSuccess={() => router.replace('/shipping')}
            stateOpen={stateOpen}
            userId={userId}
            userName={userName}
          />
        ) : context.type === 'contact' ? (
          <ContactPanel
            onSuccessAction={(message) => {
              showToast(message);
              context.onChange(actionElement, false);
            }}
          />
        ) : context.type === 'login' ? (
          <LoginPanel
            onRedirectForgetPassword={(e) => {
              e.preventDefault();
              controlAside(
                context,
                'forget-password',
                actionElement,
                stateOpen
              );
            }}
            onRedirectRegister={(e) => {
              e.preventDefault();
              controlAside(context, 'register', actionElement, stateOpen);
            }}
            onSuccessAction={() => {
              showToast('Login successful');
              context.onChange(actionElement, false);

              if (optionCheckout === 'login') {
                return router.replace(`/shipping`);
              }
              router.replace(window.location.pathname);
            }}
            optionCheckout={optionCheckout}
          />
        ) : context.type === 'register' ? (
          <RegisterPanel
            onRedirectLogin={(e) => {
              e.preventDefault();
              controlAside(context, 'login', actionElement, stateOpen);
            }}
            onSuccessAction={() => {
              showToast('Register successful');
              context.onChange(actionElement, false);
              if (optionCheckout === 'register') {
                controlAside(
                  context,
                  'login',
                  actionElement,
                  stateOpen,
                  'login'
                );
              }
            }}
          />
        ) : context.type === 'forget-password' ? (
          <ForgetPasswordPanel
            onSuccessAction={(message) => {
              showToast(message, 10000);
              context.onChange(actionElement, false);
            }}
          />
        ) : context.type === 'reset_password' ? (
          <>
            <ResetPasswordPanel
              onCancel={(e) => {
                e.preventDefault();
                router.replace(window.location.pathname);
                setTimeout(() => {
                  context.onChange(actionElement, false);
                }, 500);
              }}
              onSuccessAction={(message) => {
                router.replace(window.location.pathname);
                showToast(message);
                setTimeout(() => {
                  controlAside(context, 'login', actionElement, stateOpen);
                }, 500);
              }}
            />
          </>
        ) : context.type === 'procced-checkout-options' ? (
          <ProccedCheckoutPanel
            isPending={action.isPending}
            onCancelAction={() => {
              context.onChange(actionElement, false);
            }}
            onContinueAction={(name) => {
              const options = {
                guest: () => {
                  startTransition(() => action.formAction(new FormData()));
                },
                register: () => {
                  controlAside(
                    context,
                    'register',
                    actionElement,
                    stateOpen,
                    'register'
                  );
                },
                login: () => {
                  controlAside(
                    context,
                    'login',
                    actionElement,
                    stateOpen,
                    'login'
                  );
                },
              };

              options[name as keyof typeof options]();
            }}
          />
        ) : null}
      </aside>
    </>
  );
};
