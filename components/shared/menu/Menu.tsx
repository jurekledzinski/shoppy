'use client';
import styles from './Menu.module.css';
import { MenuProps } from './types';

const Menu = ({ children }: MenuProps) => {
  return <ul className={styles.menu}>{children}</ul>;
};

export default Menu;
