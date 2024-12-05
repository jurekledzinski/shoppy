'use client';
import React, { useState } from 'react';
import { AddToCartButton, CartItemCounter } from '@/components/shared';
import { CartQuantityContollerProps } from './types';

export const CartQuantityContoller = ({ data }: CartQuantityContollerProps) => {
  const [quanity, setQuantity] = useState(1);

  const addLocalQuantity = () => {
    setQuantity((prev) => prev + 1);
  };
  const subtractLocalQuantity = () => {
    setQuantity((prev) => prev - 1);
  };

  const addGlobalQuantity = () => {};
  const subtractGlobalQuantity = () => {};

  return (
    <React.Fragment>
      <CartItemCounter
        addGlobalQuantity={addGlobalQuantity}
        addLocalQuantity={addLocalQuantity}
        subtractGlobalQuantity={subtractGlobalQuantity}
        subtractLocalQuantity={subtractLocalQuantity}
        quanity={quanity}
        onStock={data.onStock}
      />
      <AddToCartButton
        onClick={() => {
          console.log('Confirm add to cart quantity', quanity);
        }}
      />
    </React.Fragment>
  );
};
