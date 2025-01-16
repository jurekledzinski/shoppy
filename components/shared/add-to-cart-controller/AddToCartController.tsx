'use client';
import React from 'react';
import { addItem, updateSyncCart, useCart } from '@/store/cart';
import { AddToCartButton } from '@/components/shared';
import { AddToCartControllerProps } from './types';
import { useSessionUser } from '@/store/session';
import { v4 as uuidv4 } from 'uuid';

export const AddToCartController = ({ data }: AddToCartControllerProps) => {
  const sessionUser = useSessionUser();
  const { dispatch, state } = useCart();

  const currentProductId = data._id;

  const productInCart = state.cart.products.find(
    (product) => product._id === currentProductId
  );

  return (
    <React.Fragment>
      <AddToCartButton
        onClick={() => {
          const totalAmountCart = state.cart.totalAmountCart;
          const payload = {
            data,
            ...(!Boolean(totalAmountCart) && { id: uuidv4() }),
          };

          dispatch({
            type: 'ADD_ITEM',
            payload,
          });

          const resultUpdateCart = addItem(state, {
            type: 'ADD_ITEM',
            payload,
          });

          updateSyncCart(
            resultUpdateCart,
            sessionUser.userSession,
            sessionUser.guestUser
          );
        }}
        disabled={
          data.onStock === 0 || data.onStock <= (productInCart?.quantity || 0)
            ? true
            : false
        }
      />
    </React.Fragment>
  );
};
