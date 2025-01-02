import { Cart } from '@/models';
import { useEffect } from 'react';

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
  useEffect(() => {
    const localData = JSON.stringify(localStorage.getItem('cart') || 'null');
    console.log('sessionUser hook ----------- 1', sessionUser);
    console.log('guestUser hook ------------- 2', guestUser);

    if (sessionUser) {
      console.log('SESSION USER');
      // gdy user jest normalnie zalogowany do app
      onUser();
      if (localData) localStorage.removeItem('cart');
      return;
    }

    // gdy user normalny nie jest zalogowany tylko jako guest checkout
    if (guestUser) {
      onGuest();
      console.log('GUEST USER');
      if (localData) localStorage.removeItem('cart');
      return;
    }

    onNoUser();
    // on refresh when maybe will set cart

    // gdy jest nie jest zalogowany w żaden inny sposób to zapisuje w localstorage
  }, [guestUser, sessionUser, state, onGuest, onNoUser, onUser]);
};
