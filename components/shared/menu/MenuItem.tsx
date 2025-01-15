'use client';
import styles from './MenuItem.module.css';
import { MenuItemProps } from './types';

export const MenuItem = ({ children, className, onClick }: MenuItemProps) => {
  return (
    <li
      className={[styles.menuItem, className].filter(Boolean).join(' ')}
      onClick={onClick}
    >
      {children}
    </li>
  );
};
