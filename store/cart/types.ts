import { Dispatch } from 'react';
import { Cart, ProductCart } from '@/models';

export type CartState = {
  cart: Cart;
};

export type CartProviderProps = {
  children: React.ReactNode;
};

export type CartAction =
  | { type: 'ADD_ITEM'; payload: { data: ProductCart; id?: string } }
  | { type: 'SET_QUANTITY'; payload: { id: string; qunatity: number } }
  | { type: 'INCREASE_ITEM'; payload: { id: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'SUBTRACT_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState['cart'] };

export type CartStoreContext = {
  state: CartState;
  dispatch: Dispatch<CartAction>;
};

export type CartActionHandler = (
  state: CartState,
  action: CartAction
) => CartState;
