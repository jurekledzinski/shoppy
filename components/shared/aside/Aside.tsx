'use client';
import Link from 'next/link';
import styles from './Aside.module.css';
import { Cart } from '../cart';
import { Menu, MenuItem } from '../menu';
import { useAside } from '@/store/aside';

import {
  ContactForm,
  ForgetPasswordForm,
  LoginForm,
  RegisterForm,
} from '@/components/pages';

export const Aside = () => {
  const context = useAside();

  return (
    <aside
      className={`${styles.aside} ${
        context.value ? styles.show : styles.aside
      }`}
    >
      {context.type === 'menu' ? (
        <>
          <header className={styles.header}>Welcome</header>
          <Menu>
            <MenuItem className={styles.menuItem}>
              <Link href="/" className={styles.link}>
                Home
              </Link>
            </MenuItem>
            <MenuItem
              onClick={() => {
                const actionElement = context.type;
                const stateOpen = context.value;

                if (actionElement !== 'contact' && stateOpen) {
                  context.onChange(actionElement, !stateOpen);

                  const idTimeout = setTimeout(() => {
                    context.onChange('contact', true);
                    clearTimeout(idTimeout);
                  }, 1000);

                  return;
                }
              }}
            >
              Contact
            </MenuItem>
            <MenuItem
              onClick={() => {
                const actionElement = context.type;
                const stateOpen = context.value;

                if (actionElement !== 'login' && stateOpen) {
                  context.onChange(actionElement, !stateOpen);

                  const idTimeout = setTimeout(() => {
                    context.onChange('login', true);
                    clearTimeout(idTimeout);
                  }, 1000);

                  return;
                }
              }}
            >
              Sign In
            </MenuItem>
            <MenuItem
              onClick={() => {
                const actionElement = context.type;
                const stateOpen = context.value;

                if (actionElement !== 'register' && stateOpen) {
                  context.onChange(actionElement, !stateOpen);

                  const idTimeout = setTimeout(() => {
                    context.onChange('register', true);
                    clearTimeout(idTimeout);
                  }, 1000);

                  return;
                }
              }}
            >
              Sign Up
            </MenuItem>
          </Menu>
        </>
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
        <>
          <header className={styles.header}>Sign In</header>
          <LoginForm />
        </>
      ) : context.type === 'register' ? (
        <>
          <header className={styles.header}>Sign Up</header>
          <RegisterForm />
        </>
      ) : context.type === 'change-password' ? (
        <>
          <header className={styles.header}>Forget password</header>
          <ForgetPasswordForm />
        </>
      ) : null}
    </aside>
  );
};
