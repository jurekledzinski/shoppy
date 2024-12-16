'use client';
import styles from './Aside.module.css';
import { AsideProps } from './types';
import { contact, login, logout, register, resetPassword } from '@/actions';
import { controlAside } from '@/helpers';
import { forgetPassword } from '@/actions';
import { showToast } from '@/helpers';
import { useActionState, useEffect } from 'react';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  CartPanel,
  ContactPanel,
  ForgetPasswordPanel,
  MenuPanel,
  LoginPanel,
  RegisterPanel,
  ResetPasswordPanel,
} from '@/components/pages';

import {
  useActionStateAndReset,
  useLoginForm,
  useRegisterForm,
  useResetPasswordForm,
  useForgetPasswordForm,
  useLoadResetPasswordForm,
  useContactForm,
} from '@/hooks';

export const Aside = ({ userData }: AsideProps) => {
  const context = useAside();
  const actionElement = context.type;
  const stateOpen = context.value;
  const userId = userData?._id ?? '';
  const userName = userData?.name ?? '';
  const searchParams = useSearchParams();
  const paramActionType = searchParams.get('action_type');
  const router = useRouter();
  const { dispatch, state } = useCart();

  const { action: actionLogout, resetStateAction } = useActionStateAndReset({
    fnAction: logout,
  });

  const [stateLogin, formActionLogin, isPendingLogin] = useActionState(login, {
    message: '',
    success: false,
  });

  const [stateRegister, formActionRegister, isPendingRegister] = useActionState(
    register,
    {
      message: '',
      success: false,
    }
  );

  const [stateResetPassword, formActionResetPassword, isPendingResetPassword] =
    useActionState(resetPassword, {
      message: '',
      success: false,
    });

  const [stateContact, formActionContact, isPendingContact] = useActionState(
    contact,
    {
      message: '',
      success: false,
    }
  );

  const { methodsContact, onSubmitContact } = useContactForm({
    formAction: formActionContact,
    isPending: isPendingContact,
    isSuccess: stateContact.success,
    onSuccess: () => {
      showToast(stateContact.message);
      context.onChange(actionElement, false);
    },
  });

  const [
    stateForgetPassword,
    formActionForgetPassword,
    isPendingForgetPassword,
  ] = useActionState(forgetPassword, {
    message: '',
    success: false,
  });

  const { methodsForgetPassword, onSubmitForgetPassword } =
    useForgetPasswordForm({
      formAction: formActionForgetPassword,
      isPending: isPendingForgetPassword,
      isSuccess: stateForgetPassword.success,
      onSuccess: () => {
        showToast(stateForgetPassword.message, 10000);
        context.onChange(actionElement, false);
      },
    });

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: formActionLogin,
    isPending: isPendingLogin,
    isSuccess: stateLogin.success,
    onSuccess: () => {
      showToast('Login successful');
      context.onChange(actionElement, false);
      router.replace(window.location.pathname);
    },
  });

  const { methodsRegister, onSubmitRegister } = useRegisterForm({
    formAction: formActionRegister,
    isPending: isPendingRegister,
    isSuccess: stateRegister.success,
    onSuccess: () => {
      showToast('Register successful');
      context.onChange(actionElement, false);
    },
  });

  const { methodsResetPassword, onSubmitResetPassword } = useResetPasswordForm({
    formAction: formActionResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: stateResetPassword.success,
    onSuccess: () => {
      router.replace(window.location.pathname);
      showToast('Reset password successful');
      setTimeout(() => {
        controlAside(context, 'login', actionElement, stateOpen);
      }, 500);
    },
  });

  useLoadResetPasswordForm({ context, paramActionType });

  useEffect(() => {
    if (actionLogout.state.success && !actionLogout.isPending) {
      resetStateAction();
      router.replace(window.location.pathname);
    }
  }, [
    actionLogout.state.success,
    actionLogout.isPending,
    resetStateAction,
    router,
  ]);

  return (
    <aside
      className={`${styles.aside} ${
        context.value ? styles.show : styles.aside
      }`}
    >
      {context.type === 'menu' ? (
        <MenuPanel
          onCloseAside={() => {
            context.onChange(actionElement, false);
          }}
          onLogout={() => {
            resetStateAction(new FormData());
            showToast('Logout successful');
            context.onChange(actionElement, false);
          }}
          onRedirectContact={() => {
            controlAside(context, 'contact', actionElement, stateOpen);
          }}
          onRedirectLogin={() => {
            controlAside(context, 'login', actionElement, stateOpen);
          }}
          onRedirectRegister={() => {
            controlAside(context, 'register', actionElement, stateOpen);
          }}
          user={{ id: userId, name: userName }}
        />
      ) : context.type === 'cart' ? (
        <CartPanel
          addGlobalQuantity={(id) => {
            dispatch({ type: 'INCREASE_ITEM', payload: { id } });
          }}
          data={state}
          removeItem={(id) => {
            dispatch({ type: 'REMOVE_ITEM', payload: { id } });
          }}
          subtractGlobalQuantity={(id) => {
            dispatch({ type: 'SUBTRACT_ITEM', payload: { id } });
          }}
          onClick={() => {
            if (userId) {
              // redirect to shipping page
              router.replace(`/shipping/${userId}`);
            } else {
              // open aside with options
            }
          }}
        />
      ) : context.type === 'contact' ? (
        <ContactPanel
          isPending={isPendingContact}
          methods={methodsContact}
          onSubmit={onSubmitContact}
          state={stateContact}
        />
      ) : context.type === 'login' ? (
        <LoginPanel
          isPending={isPendingLogin}
          methods={methodsLogin}
          onSubmit={onSubmitLogin}
          state={stateLogin}
          onRedirectForgetPassword={(e) => {
            e.preventDefault();
            controlAside(context, 'forget-password', actionElement, stateOpen);
          }}
          onRedirectRegister={(e) => {
            e.preventDefault();
            controlAside(context, 'register', actionElement, stateOpen);
          }}
        />
      ) : context.type === 'register' ? (
        <RegisterPanel
          isPending={isPendingRegister}
          methods={methodsRegister}
          onSubmit={onSubmitRegister}
          state={stateRegister}
          onRedirectLogin={(e) => {
            e.preventDefault();
            controlAside(context, 'login', actionElement, stateOpen);
          }}
        />
      ) : context.type === 'forget-password' ? (
        <ForgetPasswordPanel
          isPending={isPendingForgetPassword}
          methods={methodsForgetPassword}
          onSubmit={onSubmitForgetPassword}
          state={stateForgetPassword}
        />
      ) : context.type === 'reset_password' ? (
        <>
          <ResetPasswordPanel
            isPending={isPendingResetPassword}
            methods={methodsResetPassword}
            onCancel={(e) => {
              e.preventDefault();
              router.replace(window.location.pathname);
              setTimeout(() => {
                context.onChange(actionElement, false);
              }, 500);
            }}
            onSubmit={onSubmitResetPassword}
            state={stateResetPassword}
          />
        </>
      ) : null}
    </aside>
  );
};
