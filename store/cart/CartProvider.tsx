'use client';
import { CartProviderProps, CartStoreContext } from './types';
import { cartReducer } from './CartReducer';
// import { getItemFromLocalStorage, setItemToLocalStorage } from '@/helpers';

import { createContext, useContext, useMemo, useReducer } from 'react';

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
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const values = useMemo<CartStoreContext>(
    () => ({ state, dispatch }),
    [state, dispatch]
  );

  //   useEffect(() => {
  //     if (state.cart.totalAmountCart) {
  //       setItemToLocalStorage<CartState['cart']>('cart', state.cart);
  //     }
  //   }, [state]);

  //   useEffect(() => {
  //     const navigationEntries = window.performance.getEntriesByType('navigation');
  //     const amountNavEntries = navigationEntries.length > 0;
  //     const isReloadPage =
  //       (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';
  //     const localData = getItemFromLocalStorage('cart', 'null');

  //     if (amountNavEntries && isReloadPage && localData) {
  //       dispatch({ type: 'SET_CART', payload: localData });
  //     }
  //   }, []);

  //   useSyncCart({
  //     guestUser: value.guestUser,
  //     sessionUser: value.userSession,
  //     state: cartData.state.cart,
  //     onGuest: useCallback(() => {
  //       // call action to create and update cart for guest
  //     }, []),
  //     onNoUser: useCallback(() => {
  //       //   const localData = JSON.stringify(localStorage.getItem('cart') || 'null');
  //       // call to save state cart in localstorage also on refresh page
  //     }, []),
  //     onUser: useCallback(() => {
  //       // call action to create and update cart for user logged in
  //     }, []),
  //   });

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

export default CartProvider;
