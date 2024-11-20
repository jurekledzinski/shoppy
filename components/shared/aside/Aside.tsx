'use client';
import styles from './Aside.module.css';
import { Cart } from '../cart';
import { useAside } from '@/store/aside';
import { login, register } from '@/actions';
import { toast } from 'react-toastify';
import { ContactForm, ForgetPasswordForm } from '@/components/pages';
import { controlAside } from '@/helpers';
import { useActionState, useEffect } from 'react';
import { useLoginForm, useRegisterForm } from '@/hooks';
import { LoginPanel, MenuPanel, RegisterPanel } from '@/components/pages';
import { useUser } from '@/store/user';

export const Aside = () => {
  const user = useUser();
  const context = useAside();
  const actionElement = context.type;
  const stateOpen = context.value;
  const userId = user.payload?.id ?? '';
  const userName = user.payload?.name ?? '';

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

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: formActionLogin,
    isPending: isPendingLogin,
    isSuccess: stateLogin.success,
    onSuccess: () => {
      const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
      toast.success('Login successful', { theme });
      context.onChange(actionElement, false);
    },
  });

  const { methodsRegister, onSubmitRegister } = useRegisterForm({
    formAction: formActionRegister,
    isPending: isPendingRegister,
    isSuccess: stateRegister.success,
    onSuccess: () => {
      const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
      toast.success('Register successful', { theme });
      context.onChange(actionElement, false);
    },
  });

  useEffect(() => {
    if (stateLogin.body) {
      const body = stateLogin.body ? stateLogin.body : null;
      user.onChange && user.onChange(body);
    }
  }, [stateLogin.body]);

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
            user.onChange && user.onChange(null);
            context.onChange(actionElement, false);
            const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
            toast.success('Logout successful', { theme });
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
          context={context}
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
        <>
          <header className={styles.header}>Forget password</header>
          <ForgetPasswordForm />
        </>
      ) : null}
    </aside>
  );
};
