'use client';
import { AddToCartButtonProps } from './types';
import { Button } from '@/components/shared';

export const AddToCartButton = ({ className, data }: AddToCartButtonProps) => {
  return (
    <Button
      className={className}
      onClick={() => {
        console.log('Click add to cart in card', data);
      }}
      text="Add to cart"
    />
  );
};
