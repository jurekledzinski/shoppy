'use client';
import Cart from '../cart';
import Link from 'next/link';
import styles from './Aside.module.css';
import { Menu, MenuItem } from '../menu';
import { useAside } from '@/store/aside';

const Aside = () => {
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
            <MenuItem>Contact</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Sign Up</MenuItem>
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
        </>
      ) : context.type === 'login' ? (
        <>
          <header className={styles.header}>Sign In</header>
        </>
      ) : context.type === 'register' ? (
        <>
          <header className={styles.header}>Sign Up</header>
        </>
      ) : context.type === 'change-password' ? (
        <>
          <header className={styles.header}>Change password</header>
        </>
      ) : null}
    </aside>
  );
};

export default Aside;
