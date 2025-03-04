import { controlAside } from '@/helpers';
import { UseCartPanelProps } from './types';
import {
  updateSyncCart,
  increaseItem,
  subtractItem,
  removeItem as removeCartItem,
} from '@/store/cart';

export const useCartPanel = ({
  actionElement,
  context,
  dispatch,
  guestId,
  onSuccess,
  userId,
  userName,
  stateOpen,
  state,
}: UseCartPanelProps) => {
  const addGlobalQuantity = (id: string) => {
    const payload = { id };
    dispatch({ type: 'INCREASE_ITEM', payload });

    const resultUpdateCart = increaseItem(state, {
      type: 'INCREASE_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const removeItem = (id: string) => {
    const payload = { id };
    dispatch({ type: 'REMOVE_ITEM', payload });

    const resultUpdateCart = removeCartItem(state, {
      type: 'REMOVE_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const subtractGlobalQuantity = (id: string) => {
    const payload = { id };
    dispatch({ type: 'SUBTRACT_ITEM', payload });

    const resultUpdateCart = subtractItem(state, {
      type: 'SUBTRACT_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const onClick = () => {
    if ((userId && userName) || guestId) {
      return onSuccess();
    }

    controlAside(context, 'procced-checkout-options', actionElement, stateOpen);
  };

  return { addGlobalQuantity, removeItem, subtractGlobalQuantity, onClick };
};
