'use client';
import React, { useState } from 'react';
import { AddToCartButton, CartItemCounter } from '@/components/shared';
import { CartQuantityContollerProps } from './types';
import { addItem, useCart } from '@/store/cart';
import { v4 as uuidv4 } from 'uuid';
import { useSessionUser } from '@/store/session';
import { updateSyncCart } from '@/store/cart';

export const CartQuantityContoller = ({ data }: CartQuantityContollerProps) => {
  const sessionUser = useSessionUser();
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
          const totalAmountCart = state.cart.totalAmountCart;
          const payload = {
            data: { ...data, quantity: localQuanity },
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

          setLocalQuanity(1);
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
