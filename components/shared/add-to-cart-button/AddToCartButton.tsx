'use client';
import styles from '@styles/buttons.module.css';
import { AddToCartButtonProps } from './types';
import { Button } from '@/components/shared';

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  return (
    <Button
      className={styles.buttonAddToCart}
      onClick={onClick}
      text="Add to cart"
    />
  );
};
