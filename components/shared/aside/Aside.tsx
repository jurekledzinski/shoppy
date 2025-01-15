'use client';
import styles from './Aside.module.css';
import { AsideProps } from './types';
import { extendGuestSession, guestCheckout, userCheckout } from '@/actions';
import { ModalWarning } from '../modal-warning';
import { startTransition, useActionState, useCallback, useEffect } from 'react';
import { initialState, updateSyncCart, useCart } from '@/store/cart';
import { useAside } from '@/store/aside';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionUser } from '@/store/session';
import { getSession } from 'next-auth/react';

import {
  controlAside,
  redirectWithQueries,
  removeQueryUrl,
  showToast,
} from '@/helpers';
import {
  useActionStateAndReset,
  useLoadResetPasswordForm,
  useSetCartOnRefresh,
  useSetUserSession,
  useSetTimeoutController,
} from '@/hooks';

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

export const Aside = ({ guestId, userData }: AsideProps) => {
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

  const {
    action: actionUserCheckout,
    resetStateAction: resetStateActionUserCheckout,
  } = useActionStateAndReset({
    fnAction: userCheckout,
    onResetAction: () => {
      context.onChange(actionElement, false);
      setControlTimeout(() => router.replace('/shipping'), 200);
    },
  });

  useEffect(() => {
    if (actionUserCheckout.state.success && !actionUserCheckout.isPending) {
      resetStateActionUserCheckout();
    }
  }, [actionUserCheckout, resetStateActionUserCheckout]);

  const { action, resetStateAction } = useActionStateAndReset({
    fnAction: guestCheckout,
    onResetAction: () => {
      context.onChange(actionElement, false);
      updateSyncCart(state, userData?._id, guestId);
      setControlTimeout(() => router.replace('/shipping'), 200);
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

  useSetCartOnRefresh({
    onLoad: useCallback(
      (cart) => {
        if (!cart) return;
        dispatch({ type: 'SET_CART', payload: cart });
      },
      [dispatch]
    ),
    userSession: userId,
    guestSession: guestId,
  });

  const setControlTimeout = useSetTimeoutController();

  return (
    <>
      <ModalWarning
        isPending={isPending}
        isOpen={guestUserExpire === 'true'}
        isSuccess={stateExtendGuestSession.success && !isPending}
        title="Session will expire in 10 minutes"
        confirm="Extend session"
        onConfirm={() => {
          startTransition(() => formAction(new FormData()));
          const newPath = removeQueryUrl(searchParams, 'guest-user-expired');
          setControlTimeout(() => router.replace(newPath), 1000);
        }}
      >
        <p>
          Your guest session will expire in 10 minutes. Please click extend
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
            onSuccessAction={() => {
              dispatch({ type: 'CLEAR_CART' });
              const newUrl = redirectWithQueries();

              router.replace(newUrl);
              router.refresh();
            }}
          />
        ) : context.type === 'cart' ? (
          <CartPanel
            actionElement={actionElement}
            context={context}
            data={state}
            dispatch={dispatch}
            guestId={guestId}
            onSuccess={() => {
              if (userName && userId) {
                return startTransition(() =>
                  actionUserCheckout.formAction(new FormData())
                );
              }

              context.onChange(actionElement, false);
              router.replace('/shipping');
            }}
            stateOpen={stateOpen}
            userId={userId}
            userName={userName}
            state={state}
            isPending={actionUserCheckout.isPending}
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
            onSuccessAction={async () => {
              showToast('Login successful');
              context.onChange(actionElement, false);
              const updatedSession = await getSession();
              const idUser = updatedSession?.user.id;

              if (state.cart.totalAmountCart) {
                const resultCart = await updateSyncCart(state, idUser, guestId);
                dispatch({
                  type: 'SET_CART',
                  payload: resultCart?.payload ?? initialState.cart,
                });
              }

              if (optionCheckout === 'login') {
                setControlTimeout(() => router.replace('/shipping'), 200);
                return;
              }

              const newUrl = redirectWithQueries();
              router.push(newUrl);
              router.refresh();
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
                const newUrl = redirectWithQueries();
                router.replace(newUrl);
                setControlTimeout(
                  () => context.onChange(actionElement, false),
                  500
                );
              }}
              onSuccessAction={(message) => {
                const newUrl = redirectWithQueries();
                router.replace(newUrl);
                showToast(message);
                setControlTimeout(
                  () =>
                    controlAside(context, 'login', actionElement, stateOpen),
                  500
                );
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
