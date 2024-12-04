'use client';
import styles from './Cart.module.css';
import { CartProps } from './types';

export const Cart = ({ data }: CartProps) => {
  console.log('Cart data', data);
  return <div className={styles.cart}>Cart</div>;
};
