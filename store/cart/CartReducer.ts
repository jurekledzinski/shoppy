'use client';
import { CartAction, CartState } from './types';
import {
  addItem,
  clearCart,
  increaseItem,
  removeItem,
  setItem,
  subtractItem,
  updateItem,
} from './CartFunctions';

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return addItem(state, action);
    case 'SET_QUANTITY':
      return updateItem(state, action);
    case 'INCREASE_ITEM':
      return increaseItem(state, action);
    case 'SUBTRACT_ITEM':
      return subtractItem(state, action);
    case 'REMOVE_ITEM':
      return removeItem(state, action);
    case 'SET_CART':
      return setItem(state, action);
    case 'CLEAR_CART':
      return clearCart(state, action);
    default:
      return state;
  }
};
