import { Cart } from '@/models';
import { getItemFromLocalStorage } from '@/helpers';
import { useEffect } from 'react';

type UseSetCartOnRefreshProps = {
  onSetCart: (localData: Cart) => void;
};

export const useSetCartOnRefresh = ({
  onSetCart,
}: UseSetCartOnRefreshProps) => {
  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const amountNavEntries = navigationEntries.length > 0;
    const isReloadPage =
      (navigationEntries[0] as PerformanceNavigationTiming).type === 'reload';

    const localData = getItemFromLocalStorage('cart', 'null');

    if (amountNavEntries && isReloadPage && localData) {
      onSetCart(localData);
    }
  }, [onSetCart]);
};
