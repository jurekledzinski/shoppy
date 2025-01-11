'use client';
import { cart } from '@/actions';
import { CartState } from './types';
import { removeItemFromLocalStorage, setItemToLocalStorage } from '@/helpers';

export const updateSyncCart = async (
  updatedCart: CartState,
  userSession?: string | null,
  guestSession?: string | null
) => {
  switch (true) {
    case Boolean(userSession):
      const formDataUser = new FormData();
      formDataUser.set('userId', userSession!);
      formDataUser.set('cart', JSON.stringify(updatedCart.cart));

      cart('', formDataUser);

      const localData1 = JSON.parse(localStorage.getItem('cart') || 'null');
      if (localData1) localStorage.removeItem('cart');
      break;

    case Boolean(guestSession):
      const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
      const formDataGuest = new FormData();
      formDataGuest.set('guestId', guestSession!);
      formDataGuest.set('expiryAt', expiresIn.toISOString());
      formDataGuest.set('cart', JSON.stringify(updatedCart.cart));

      cart('', formDataGuest);

      const localData2 = JSON.parse(localStorage.getItem('cart') || 'null');
      if (localData2) localStorage.removeItem('cart');
      break;

    default:
      if (updatedCart.cart.totalAmountCart) {
        setItemToLocalStorage<CartState['cart']>('cart', updatedCart.cart);
      } else {
        removeItemFromLocalStorage('cart');
      }
      break;
  }
};
