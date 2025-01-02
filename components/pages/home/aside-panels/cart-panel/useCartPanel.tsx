import { UseCartPanelProps } from './types';
import {
  controlAside,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from '@/helpers';

export const useCartPanel = ({
  actionElement,
  context,
  dispatch,
  guestId,
  onSuccess,
  userId,
  userName,
  stateOpen,
}: UseCartPanelProps) => {
  const addGlobalQuantity = (id: string) => {
    dispatch({ type: 'INCREASE_ITEM', payload: { id } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });

    const localData = getItemFromLocalStorage('cart', 'null');
    if (localData && localData.products.length === 1) {
      removeItemFromLocalStorage('cart');
    }
  };
  const subtractGlobalQuantity = (id: string) => {
    dispatch({ type: 'SUBTRACT_ITEM', payload: { id } });
  };

  const onClick = () => {
    if ((userId && userName) || guestId) {
      // redirect to shipping page when logged in
      context.onChange(actionElement, false);
      return onSuccess();
    }

    // otherwise open aside with options
    controlAside(context, 'procced-checkout-options', actionElement, stateOpen);
  };

  return { addGlobalQuantity, removeItem, subtractGlobalQuantity, onClick };
};
