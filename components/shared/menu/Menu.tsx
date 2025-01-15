'use client';
import styles from './Menu.module.css';
import { MenuProps } from './types';

export const Menu = ({ children }: MenuProps) => {
  return <ul className={styles.menu}>{children}</ul>;
};
