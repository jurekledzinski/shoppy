'use client';
import Link from 'next/link';
import styles from './MenuPanel.module.css';
import { Menu, MenuItem } from '@/components/shared';
import { MenuPanelProps } from './types';

export const MenuPanel = ({
  onRedirectContact,
  onRedirectLogin,
  onRedirectRegister,
  onCloseAside,
  userId,
}: MenuPanelProps) => {
  return (
    <>
      <header className={styles.header}>Welcome</header>
      <Menu>
        <MenuItem className={styles.menuItemPanel}>
          <Link href="/" className={styles.link} onClick={onCloseAside}>
            Home
          </Link>
        </MenuItem>
        <MenuItem className={styles.menuItemPanel}>
          <Link
            href={`/orders/${userId}`}
            className={styles.link}
            onClick={onCloseAside}
          >
            Orders
          </Link>
        </MenuItem>
        <MenuItem className={styles.menuItemPanel}>
          <Link
            href={`/profile/${userId}`}
            className={styles.link}
            onClick={onCloseAside}
          >
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={onRedirectContact}>Contact</MenuItem>
        <MenuItem onClick={onRedirectLogin}>Sign In</MenuItem>
        <MenuItem onClick={onRedirectRegister}>Sign Up</MenuItem>
      </Menu>
    </>
  );
};
