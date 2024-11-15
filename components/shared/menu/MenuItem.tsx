'use client';
import styles from './MenuItem.module.css';
import { MenuItemProps } from './types';

const MenuItem = ({ children, className }: MenuItemProps) => {
  return (
    <li className={[styles.menuItem, className].filter(Boolean).join(' ')}>
      {children}
    </li>
  );
};

export default MenuItem;
