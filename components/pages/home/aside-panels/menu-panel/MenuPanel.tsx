'use client';
import Link from 'next/link';
import styles from './MenuPanel.module.css';
import { Menu, MenuItem } from '@/components/shared';
import { MenuPanelProps } from './types';
import { useMenuPanel } from './useMenuPanel';

export const MenuPanel = ({
  actionElement,
  context,
  stateOpen,
  user,
  onSuccess,
}: MenuPanelProps) => {
  const {
    onCloseAside,
    onLogout,
    onRedirectContact,
    onRedirectLogin,
    onRedirectRegister,
  } = useMenuPanel({
    actionElement,
    context,
    stateOpen,
    onSuccess,
  });

  return (
    <>
      <header className={styles.header}>Welcome {user.userName}</header>
      <Menu>
        <MenuItem className={styles.menuItemLink}>
          <Link
            href="/"
            className={styles.link}
            onClick={onCloseAside}
            prefetch={true}
          >
            Home
          </Link>
        </MenuItem>
        {user.userId && (
          <MenuItem className={styles.menuItemLink}>
            <Link
              href={`/orders/${user.userId}`}
              className={styles.link}
              onClick={onCloseAside}
              prefetch={true}
            >
              Orders
            </Link>
          </MenuItem>
        )}
        {user.userId && (
          <MenuItem className={styles.menuItemLink}>
            <Link
              href={`/profile/${user.userId}`}
              className={styles.link}
              onClick={onCloseAside}
              prefetch={true}
            >
              Profile
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={onRedirectContact}>Contact</MenuItem>
        {!user.userId && <MenuItem onClick={onRedirectLogin}>Sign In</MenuItem>}
        {!user.userId && (
          <MenuItem onClick={onRedirectRegister}>Sign Up</MenuItem>
        )}
        {user.userId && <MenuItem onClick={onLogout}>Logout</MenuItem>}
      </Menu>
    </>
  );
};
