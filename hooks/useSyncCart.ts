import { Cart } from '@/models';
import { useEffect, useRef } from 'react';

type UseSyncCartProps = {
  guestUser: string | null;
  sessionUser: string | null;
  state: Cart;
  onGuest: () => void;
  onNoUser: () => void;
  onUser: () => void;
};
export const useSyncCart = ({
  guestUser,
  sessionUser,
  state,
  onGuest,
  onNoUser,
  onUser,
}: UseSyncCartProps) => {
  const prevCartRef = useRef(0);
  const prevSessionUser = useRef(false);

  useEffect(() => {
    console.log('prevCartRef', prevCartRef.current);
    console.log('state.totalAmountCart', state.totalAmountCart);

    if (
      prevCartRef.current === state.totalAmountCart &&
      prevSessionUser.current
    )
      return; // Skip syncing if the cart hasn't changed
    // Store the current cart state for future comparison
    prevCartRef.current = state.totalAmountCart;

    const localData = JSON.parse(localStorage.getItem('cart') || 'null');

    if (sessionUser) {
      // gdy user jest normalnie zalogowany do app
      onUser();
      prevSessionUser.current = true;
      if (localData) localStorage.removeItem('cart');
      return;
    }

    // gdy user normalny nie jest zalogowany tylko jako guest checkout
    if (guestUser) {
      onGuest();
      prevSessionUser.current = true;
      if (localData) localStorage.removeItem('cart');
      return;
    }

    // gdy jest nie jest zalogowany w żaden inny sposób to zapisuje w localstorage
    onNoUser();
  }, [
    guestUser,
    sessionUser,
    state.totalAmountCart,
    onGuest,
    onNoUser,
    onUser,
  ]);
};
