'use client';
import React from 'react';
import { AddToCartButton } from '@/components/shared';
import { AddToCartControllerProps } from './types';
import { useCart } from '@/store/cart';
import { v4 as uuidv4 } from 'uuid';

export const AddToCartController = ({ data }: AddToCartControllerProps) => {
  const { dispatch, state } = useCart();

  const currentProductId = data._id;

  const productInCart = state.cart.products.find(
    (product) => product._id === currentProductId
  );

  return (
    <React.Fragment>
      <AddToCartButton
        onClick={() => {
          dispatch({
            type: 'ADD_ITEM',
            payload: { data, ...(!productInCart && { id: uuidv4() }) },
          });
        }}
        disabled={
          productInCart ? data.onStock <= productInCart.quantity : false
        }
      />
    </React.Fragment>
  );
};
