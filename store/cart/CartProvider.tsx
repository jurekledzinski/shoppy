'use client';
import { createContext, useContext, useMemo, useReducer } from 'react';
import { CartProviderProps, CartStoreContext } from './types';
import { cartReducer } from './CartReducer';

const initialState = { cart: null };

export const CartContext = createContext<CartStoreContext>({
  state: initialState,
  dispatch: () => undefined,
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('Place is not wrapped by card provider');
  return context;
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const values = useMemo<CartStoreContext>(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;