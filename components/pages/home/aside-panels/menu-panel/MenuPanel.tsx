import Link from 'next/link';
import styles from './MenuPanel.module.css';
import { Menu, MenuItem } from '@/components/shared';
import { MenuPanelProps } from './types';

export const MenuPanel = ({
  onCloseAside,
  onLogout,
  onRedirectContact,
  onRedirectLogin,
  onRedirectRegister,
  user,
}: MenuPanelProps) => {
  return (
    <>
      <header className={styles.header}>Welcome {user.name ?? ''}</header>
      <Menu>
        <MenuItem className={styles.menuItemLink}>
          <Link href="/" className={styles.link} onClick={onCloseAside}>
            Home
          </Link>
        </MenuItem>
        {user.id && (
          <MenuItem className={styles.menuItemLink}>
            <Link
              href={`/orders/${user.id}`}
              className={styles.link}
              onClick={onCloseAside}
            >
              Orders
            </Link>
          </MenuItem>
        )}
        {user.id && (
          <MenuItem className={styles.menuItemLink}>
            <Link
              href={`/profile/${user.id}`}
              className={styles.link}
              onClick={onCloseAside}
            >
              Profile
            </Link>
          </MenuItem>
        )}
        <MenuItem onClick={onRedirectContact}>Contact</MenuItem>
        {!user.id && <MenuItem onClick={onRedirectLogin}>Sign In</MenuItem>}
        {!user.id && <MenuItem onClick={onRedirectRegister}>Sign Up</MenuItem>}
        {user.id && <MenuItem onClick={onLogout}>Logout</MenuItem>}
      </Menu>
    </>
  );
};
