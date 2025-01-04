'use client';
import { CartProviderProps, CartState, CartStoreContext } from './types';
import { cartReducer } from './CartReducer';
import { cart } from '@/actions';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import { useSessionUser } from '../session/SessionUserProvider';
import { useSetCartOnRefresh, useSyncCart } from '@/hooks';
import { setItemToLocalStorage } from '@/helpers';

export const initialState = {
  cart: {
    cartId: null,
    products: [],
    totalAmountCart: 0,
    totalPriceCart: 0,
  },
};

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
  const sessionUser = useSessionUser();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const values = useMemo<CartStoreContext>(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  useSyncCart({
    guestUser: sessionUser.guestUser,
    sessionUser: sessionUser.userSession,
    state: state.cart,
    onGuest: useCallback(() => {
      console.log('ACTION SAVE CART FOR GUEST');
      const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
      const formData = new FormData();
      formData.set('guestId', sessionUser.guestUser!);
      formData.set('expiryAt', expiresIn.toISOString());
      formData.set('cart', JSON.stringify(state.cart));

      cart('', formData);
    }, [sessionUser.guestUser, state.cart]),

    onUser: useCallback(async () => {
      console.log('ACTION SAVE CART FOR LOGGED IN USER');
      const formData = new FormData();
      formData.set('userId', sessionUser.userSession!);
      formData.set('cart', JSON.stringify(state.cart));

      cart('', formData);
    }, [sessionUser.userSession, state.cart]),

    onNoUser: useCallback(() => {
      console.log('NO USER TO LOCALSTORAGE');

      if (state.cart.totalAmountCart) {
        setItemToLocalStorage<CartState['cart']>('cart', state.cart);
      }
    }, [state.cart]),
  });

  useSetCartOnRefresh({
    onSetCart: useCallback((localData) => {
      dispatch({ type: 'SET_CART', payload: localData });
    }, []),
  });

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;
