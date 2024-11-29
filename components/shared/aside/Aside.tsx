'use client';
import styles from './Aside.module.css';
import { Cart } from '../cart';
import { contact, login, logout, register, resetPassword } from '@/actions';
import { controlAside } from '@/helpers';
import { forgetPassword } from '@/actions';
import { showToast } from '@helpers/toasts';
import { useActionState } from 'react';
import { useAside } from '@/store/aside';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@/store/user';

import {
  ContactPanel,
  ForgetPasswordPanel,
  MenuPanel,
  LoginPanel,
  RegisterPanel,
  ResetPasswordPanel,
} from '@/components/pages';

import {
  useActionStateAndReset,
  useLoadUser,
  useLoginForm,
  useRegisterForm,
  useResetPasswordForm,
  useForgetPasswordForm,
  useLoadResetPasswordForm,
  useContactForm,
} from '@/hooks';

export const Aside = () => {
  const user = useUser();
  const context = useAside();
  const actionElement = context.type;
  const stateOpen = context.value;
  const userId = user.payload?.id ?? '';
  const userName = user.payload?.name ?? '';
  const searchParams = useSearchParams();
  const paramActionType = searchParams.get('action_type');
  const router = useRouter();

  const { resetStateAction: resetStateActionLogout } = useActionStateAndReset({
    fnAction: logout,
  });

  const { action: actionLogin, resetStateAction: resetStateActionLogin } =
    useActionStateAndReset({
      fnAction: login,
      onResetAction: () => {
        if (user.onChange) user.onChange(null);
      },
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
    onSuccessAction: () => {
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
      onSuccessAction: () => {
        showToast(stateForgetPassword.message, 10000);
        context.onChange(actionElement, false);
      },
    });

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: actionLogin.formAction,
    isPending: actionLogin.isPending,
    isSuccess: actionLogin.state.success,
    onSuccessAction: () => {
      showToast('Login successful');
      context.onChange(actionElement, false);
    },
  });

  const { methodsRegister, onSubmitRegister } = useRegisterForm({
    formAction: formActionRegister,
    isPending: isPendingRegister,
    isSuccess: stateRegister.success,
    onSuccessAction: () => {
      showToast('Register successful');
      context.onChange(actionElement, false);
    },
  });

  const { methodsResetPassword, onSubmitResetPassword } = useResetPasswordForm({
    formAction: formActionResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: stateResetPassword.success,
    onSuccessAction: () => {
      router.replace(window.location.pathname);
      showToast('Reset password successful');
      setTimeout(() => {
        controlAside(context, 'login', actionElement, stateOpen);
      }, 500);
    },
  });

  useLoadUser({ body: actionLogin.state.body, onChange: user.onChange });
  useLoadResetPasswordForm({ context, paramActionType });

  return (
    <aside
      className={`${styles.aside} ${
        context.value ? styles.show : styles.aside
      }`}
    >
      {context.type === 'menu' ? (
        <MenuPanel
          onCloseAsideAction={() => {
            context.onChange(actionElement, false);
          }}
          onLogoutAction={() => {
            resetStateActionLogin();
            resetStateActionLogout(new FormData());
            showToast('Logout successful');
            context.onChange(actionElement, false);
            router.replace('/');
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
        <>
          <header className={styles.header}>Shopping cart</header>
          <Cart />
        </>
      ) : context.type === 'contact' ? (
        <ContactPanel
          isPending={isPendingContact}
          methods={methodsContact}
          onSubmitAction={onSubmitContact}
          state={stateContact}
        />
      ) : context.type === 'login' ? (
        <LoginPanel
          isPending={actionLogin.isPending}
          methods={methodsLogin}
          onSubmitAction={onSubmitLogin}
          state={actionLogin.state}
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
          onSubmitAction={onSubmitRegister}
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
          onSubmitAction={onSubmitForgetPassword}
          state={stateForgetPassword}
        />
      ) : context.type === 'reset_password' ? (
        <>
          <ResetPasswordPanel
            isPending={isPendingResetPassword}
            methods={methodsResetPassword}
            onCancelAction={(e) => {
              e.preventDefault();
              router.replace(window.location.pathname);
              setTimeout(() => {
                context.onChange(actionElement, false);
              }, 500);
            }}
            onSubmitAction={onSubmitResetPassword}
            state={stateResetPassword}
          />
        </>
      ) : null}
    </aside>
  );
};
