import { Cart } from '@/models';
import { getItemFromLocalStorage } from '@/helpers';
import { useCallback, useEffect } from 'react';

type UseSetCartOnRefreshProps = {
  onLoad: (cart: Cart) => void;
  guestSession: string | null;
  userSession: string | null;
};

const urlGetCart = `/api/v1/cart`;

export const useSetCartOnRefresh = ({
  onLoad,
  guestSession,
  userSession,
}: UseSetCartOnRefreshProps) => {
  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch(urlGetCart, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      onLoad(data.payload);
      console.log('DATA FETCH client', data);
    } catch {}
  }, [onLoad]);

  useEffect(() => {
    if (guestSession || userSession) {
      fetchCart();
    } else {
      const localData = getItemFromLocalStorage('cart', 'null');
      onLoad(localData);
    }
  }, [fetchCart, guestSession, onLoad, userSession]);
};
