'use client';
import { Cart } from '@/models';
import { CartAction, CartState } from './types';
import { cloneDeep } from 'lodash';

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (!state.cart) return state;

      const indexProduct = state.cart.products.findIndex(
        (product) => product._id === action.payload._id
      );

      let udpatedProducts: Cart['products'];

      if (indexProduct >= 0) {
        udpatedProducts = cloneDeep(state.cart.products);
        udpatedProducts[indexProduct].quantity += 1;
      } else {
        udpatedProducts = [...cloneDeep(state.cart.products), action.payload];
      }

      const totalAmountCart = udpatedProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      const totalPriceCart = udpatedProducts.reduce(
        (acc, product) => acc + product.quantity * product.price,
        0
      );

      return {
        cart: {
          ...state.cart,
          products: udpatedProducts,
          totalAmountCart,
          totalPriceCart,
        },
      };

    case 'SUBTRACT_ITEM': {
      if (!state.cart) return state;

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
        (acc, product) => acc - product.quantity,
        0
      );

      const totalPriceSubtractCart = udpatedSubtractProducts.reduce(
        (acc, product) => acc - product.quantity * product.price,
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
    }

    case 'REMOVE_ITEM':
      if (!state.cart) return state;

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
          products: restProducts,
          totalAmountCart: totalAmountCartAfterRemove,
          totalPriceCart: totalPriceCartAfterRemove,
        },
      };

    case 'CLEAR_CART':
      return { cart: action.payload };
    default:
      return state;
  }
};
