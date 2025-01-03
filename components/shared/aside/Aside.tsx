'use client';
import styles from './Aside.module.css';
import { AsideProps } from './types';
import { controlAside } from '@/helpers';
import { guestCheckout } from '@/actions';
import { showToast } from '@/helpers';
import { startTransition, useActionState, useEffect } from 'react';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';
import { useLoadResetPasswordForm } from '@/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

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
import { useSessionUser } from '@/store/session/SessionUserProvider';

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
  const router = useRouter();
  const { dispatch, state } = useCart();

  const [stateGuest, formActionGuest, isPendingGuest] = useActionState(
    guestCheckout,
    {
      message: '',
      success: false,
    }
  );

  useLoadResetPasswordForm({ context, paramActionType });

  useEffect(() => {
    if (stateGuest.success && !isPendingGuest) {
      router.replace(`/shipping`);
    }
  }, [stateGuest.success, isPendingGuest, router]);

  console.log('cartData aside from db', cartData);

  // set userId or guestId session user store
  useEffect(() => {
    if (guestId && sessionUser.setSessionUser) {
      sessionUser?.setSessionUser((prev) => ({ ...prev, guestUser: guestId }));
    }
    if (userId && sessionUser?.setSessionUser) {
      sessionUser?.setSessionUser((prev) => ({ ...prev, userSession: userId }));
    }
  }, [guestId, userId, sessionUser]);

  return (
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
          onSuccess={() => router.replace(window.location.pathname)}
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
          onSuccess={(message) => {
            showToast(message);
            context.onChange(actionElement, false);
          }}
        />
      ) : context.type === 'login' ? (
        <LoginPanel
          onRedirectForgetPassword={(e) => {
            e.preventDefault();
            controlAside(context, 'forget-password', actionElement, stateOpen);
          }}
          onRedirectRegister={(e) => {
            e.preventDefault();
            controlAside(context, 'register', actionElement, stateOpen);
          }}
          onSuccess={() => {
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
          onSuccess={() => {
            showToast('Register successful');
            context.onChange(actionElement, false);
            if (optionCheckout === 'register') {
              controlAside(context, 'login', actionElement, stateOpen, 'login');
            }
          }}
        />
      ) : context.type === 'forget-password' ? (
        <ForgetPasswordPanel
          onSuccess={(message) => {
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
            onSuccess={(message) => {
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
          onCancelAction={() => {
            context.onChange(actionElement, false);
          }}
          onContinueAction={(name) => {
            const options = {
              guest: () => {
                startTransition(() => formActionGuest(new FormData()));
                context.onChange(actionElement, false);
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
  );
};

// onmount check for option register i login to open form on refresh in case
// custom hook to check for it
