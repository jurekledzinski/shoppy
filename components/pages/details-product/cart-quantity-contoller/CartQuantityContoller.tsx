'use client';
import React, { useState } from 'react';
import { AddToCartButton, CartItemCounter } from '@/components/shared';
import { CartQuantityContollerProps } from './types';
import { useCart } from '@/store/cart';
import { v4 as uuidv4 } from 'uuid';

export const CartQuantityContoller = ({ data }: CartQuantityContollerProps) => {
  const [localQuanity, setLocalQuanity] = useState(1);
  const { state, dispatch } = useCart();
  const currentProductId = data._id!;

  const productInCart = state.cart.products.find(
    (product) => product._id === currentProductId
  );

  const addLocalQuantity = () => {
    setLocalQuanity((prev) => prev + 1);
  };
  const subtractLocalQuantity = () => {
    setLocalQuanity((prev) => prev - 1);
  };

  return (
    <React.Fragment>
      <CartItemCounter
        addLocalQuantity={addLocalQuantity}
        subtractLocalQuantity={subtractLocalQuantity}
        quanity={localQuanity}
        disabledButtonMinus={localQuanity === 1}
        disabledButtonPlus={
          productInCart
            ? data.onStock - productInCart.quantity <= localQuanity
            : data.onStock <= localQuanity
        }
      />
      <AddToCartButton
        onClick={() => {
          dispatch({
            type: 'ADD_ITEM',
            payload: {
              data: { ...data, quantity: localQuanity },
              ...(!productInCart && { id: uuidv4() }),
            },
          });
          setLocalQuanity(1);
        }}
        disabled={
          productInCart ? data.onStock <= productInCart.quantity : false
        }
      />
    </React.Fragment>
  );
};
