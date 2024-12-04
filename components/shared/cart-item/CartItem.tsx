'use client';
import styles from './CartItem.module.css';
import { CartItemProps } from './types';

export const CartItem = ({ data }: CartItemProps) => {
  console.log('data', data);
  return <div className={styles.cartItem}></div>;
};
