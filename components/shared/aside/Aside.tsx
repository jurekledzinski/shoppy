'use client';
import styles from './Aside.module.css';
import { Cart } from '../cart';
import { ContactForm, ForgetPasswordForm } from '@/components/pages';
import { controlAside } from '@/helpers';
import { login, logout, register } from '@/actions';
import { LoginPanel, MenuPanel, RegisterPanel } from '@/components/pages';
import { setDefaultCloseAside } from './helpers';
import { useActionState } from 'react';
import { useAside } from '@/store/aside';
import { useUser } from '@/store/user';

import {
  useActionStateAndReset,
  useLoadUser,
  useLoginForm,
  useRegisterForm,
} from '@/hooks';

export const Aside = () => {
  const user = useUser();
  const context = useAside();
  const actionElement = context.type;
  const stateOpen = context.value;
  const userId = user.payload?.id ?? '';
  const userName = user.payload?.name ?? '';

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

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: actionLogin.formAction,
    isPending: actionLogin.isPending,
    isSuccess: actionLogin.state.success,
    onSuccessAction: () =>
      setDefaultCloseAside(context, 'Login successful', actionElement),
  });

  const { methodsRegister, onSubmitRegister } = useRegisterForm({
    formAction: formActionRegister,
    isPending: isPendingRegister,
    isSuccess: stateRegister.success,
    onSuccessAction: () =>
      setDefaultCloseAside(context, 'Register successful', actionElement),
  });

  useLoadUser({ body: actionLogin.state.body, onChange: user.onChange });

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
            resetStateActionLogin();
            resetStateActionLogout(new FormData());
            setDefaultCloseAside(context, 'Logout successful', actionElement);
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
        <>
          <header className={styles.header}>Contact</header>
          <ContactForm />
        </>
      ) : context.type === 'login' ? (
        <LoginPanel
          context={context}
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
          context={context}
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
        <>
          <header className={styles.header}>Forget password</header>
          <ForgetPasswordForm />
        </>
      ) : null}
    </aside>
  );
};
