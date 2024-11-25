import { Dispatch } from 'react';
import { Cart, ProductCart } from '@/models';

export type CartState = {
  cart: Cart | null;
};

export type CartProviderProps = {
  children: React.ReactNode;
};

export type CartAction =
  | { type: 'ADD_ITEM'; payload: ProductCart }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'SUBTRACT_ITEM'; payload: { id: string } }
  | { type: 'CLEAR_CART'; payload: null };

export type CartStoreContext = {
  state: CartState;
  dispatch: Dispatch<CartAction>;
};
