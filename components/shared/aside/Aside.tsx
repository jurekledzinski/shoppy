'use client';
import styles from './Aside.module.css';
import { Menu, MenuItem } from '../menu';
import Cart from '../cart';
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
          <header>Welcome</header>
          <Menu>
            <MenuItem>Home</MenuItem>
            <MenuItem>Contact</MenuItem>
            <MenuItem>Sign In</MenuItem>
            <MenuItem>Sign Up</MenuItem>
          </Menu>
        </>
      ) : context.type === 'cart' ? (
        <>
          <header>Shopping cart</header>
          <Cart />
        </>
      ) : context.type === 'contact' ? (
        <>
          <header>Contact</header>
        </>
      ) : context.type === 'login' ? (
        <>
          <header>Sign In</header>
        </>
      ) : context.type === 'register' ? (
        <>
          <header>Sign Up</header>
        </>
      ) : context.type === 'change-password' ? (
        <>
          <header>Change password</header>
        </>
      ) : null}
    </aside>
  );
};

export default Aside;

// type: 'cart'
// type: 'menu'
