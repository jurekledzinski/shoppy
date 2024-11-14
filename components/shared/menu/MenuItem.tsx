'use client';
import styles from './MenuItem.module.css';
import { MenuItemProps } from './types';

const MenuItem = ({ children }: MenuItemProps) => {
  return <li className={styles.menuItem}>{children}</li>;
};

export default MenuItem;
