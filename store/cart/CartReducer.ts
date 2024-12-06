'use client';
import { Cart } from '@/models';
import { CartAction, CartState } from './types';
import { cloneDeep } from 'lodash';
import { initialState } from './CartProvider';

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const indexAddProduct = state.cart
        ? state.cart.products.findIndex(
            (product) => product._id === action.payload.data._id
          )
        : -1;

      let udpatedProducts: Cart['products'];

      if (indexAddProduct >= 0) {
        udpatedProducts = cloneDeep(state.cart ? state.cart.products : []);
        udpatedProducts[indexAddProduct].quantity +=
          action.payload.data.quantity;
      } else {
        udpatedProducts = [
          ...cloneDeep(state.cart ? state.cart.products : []),
          action.payload.data,
        ];
      }

      const totalAmountCart = udpatedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      const totalPriceCart = udpatedProducts.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );

      const cartId =
        indexAddProduct < 0 ? action.payload.id! : state.cart?.cartId ?? '';

      return {
        cart: {
          ...state.cart,
          cartId,
          products: udpatedProducts,
          totalAmountCart,
          totalPriceCart,
        },
      };

    case 'INCREASE_ITEM':
      const indexIncreaseProduct = state.cart.products.findIndex(
        (product) => product._id === action.payload.id
      );

      let udpatedIncreaseProducts: Cart['products'];

      if (indexIncreaseProduct >= 0) {
        udpatedIncreaseProducts = cloneDeep(state.cart.products);
        udpatedIncreaseProducts[indexIncreaseProduct].quantity += 1;
      } else {
        udpatedIncreaseProducts = cloneDeep(state.cart.products);
      }

      const totalAmountIncreaseCart = udpatedIncreaseProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      const totalPriceIncreaseCart = udpatedIncreaseProducts.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );

      return {
        cart: {
          ...state.cart,
          products: udpatedIncreaseProducts,
          totalAmountCart: totalAmountIncreaseCart,
          totalPriceCart: totalPriceIncreaseCart,
        },
      };

    case 'SUBTRACT_ITEM':
      const indexSubtrackProduct = state.cart.products.findIndex(
        (product) => product._id === action.payload.id
      );

      let udpatedSubtractProducts: Cart['products'];

      if (indexSubtrackProduct >= 0) {
        udpatedSubtractProducts = cloneDeep(state.cart.products);
        udpatedSubtractProducts[indexSubtrackProduct].quantity -= 1;
      } else {
        udpatedSubtractProducts = cloneDeep(state.cart.products);
      }

      const totalAmountSubtractCart = udpatedSubtractProducts.reduce(
        (acc, product) => product.quantity - acc,
        0
      );

      const totalPriceSubtractCart = udpatedSubtractProducts.reduce(
        (acc, product) => (product.quantity - acc) * product.price,
        0
      );

      return {
        cart: {
          ...state.cart,
          products: udpatedSubtractProducts,
          totalAmountCart: totalAmountSubtractCart,
          totalPriceCart: totalPriceSubtractCart,
        },
      };

    case 'REMOVE_ITEM':
      const restProducts = state.cart.products.filter(
        (product) => product._id !== action.payload.id
      );

      const totalAmountCartAfterRemove = restProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      const totalPriceCartAfterRemove = restProducts.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );

      return {
        cart: {
          ...state.cart,
          cartId: state.cart.products.length ? state.cart.cartId : null,
          products: restProducts,
          totalAmountCart: totalAmountCartAfterRemove,
          totalPriceCart: totalPriceCartAfterRemove,
        },
      };

    case 'CLEAR_CART':
      return { cart: initialState.cart };
    default:
      return state;
  }
};
