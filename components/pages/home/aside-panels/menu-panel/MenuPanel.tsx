'use client';
import Link from 'next/link';
import styles from './MenuPanel.module.css';
import { Menu, MenuItem } from '@/components/shared';
import { MenuPanelProps } from './types';

export const MenuPanel = ({
  onRedirectContact,
  onRedirectLogin,
  onRedirectRegister,
}: MenuPanelProps) => {
  return (
    <>
      <header className={styles.header}>Welcome</header>
      <Menu>
        <MenuItem className={styles.menuItem}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
        </MenuItem>
        <MenuItem onClick={onRedirectContact}>Contact</MenuItem>
        <MenuItem onClick={onRedirectLogin}>Sign In</MenuItem>
        <MenuItem onClick={onRedirectRegister}>Sign Up</MenuItem>
      </Menu>
    </>
  );
};
