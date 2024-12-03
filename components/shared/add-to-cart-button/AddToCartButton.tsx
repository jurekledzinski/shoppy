'use client';
import { AddToCartButtonProps } from './types';
import { Button } from '@/components/shared';

import styles from './AddToCartButton.module.css';

export const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  return (
    <Button className={styles.button} onClick={onClick} text="Add to cart" />
  );
};
