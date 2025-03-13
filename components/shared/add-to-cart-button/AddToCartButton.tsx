'use client';
import { Button } from '../button';
import { AddToCartButtonProps } from './types';

export const AddToCartButton = ({
  disabled,
  onClick,
}: AddToCartButtonProps) => {
  return (
    <Button
      onClick={onClick}
      label="Add to cart"
      disabled={disabled}
      radius={2}
    />
  );
};
