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
  onDispatch,
  onSuccess,
  user,
  stateOpen,
  cartState,
}: UseCartPanelProps) => {
  const { guestId, userName, userId } = user;
  const addGlobalQuantity = (id: string) => {
    const payload = { id };
    onDispatch('INCREASE_ITEM', payload);

    const resultUpdateCart = increaseItem(cartState, {
      type: 'INCREASE_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const removeItem = (id: string) => {
    const payload = { id };
    onDispatch('REMOVE_ITEM', payload);

    const resultUpdateCart = removeCartItem(cartState, {
      type: 'REMOVE_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const subtractGlobalQuantity = (id: string) => {
    const payload = { id };
    onDispatch('SUBTRACT_ITEM', payload);

    const resultUpdateCart = subtractItem(cartState, {
      type: 'SUBTRACT_ITEM',
      payload,
    });
    updateSyncCart(resultUpdateCart, userId, guestId);
  };

  const onClick = () => {
    if ((userId && userName) || guestId) return onSuccess();
    controlAside(context, 'procced-checkout-options', actionElement, stateOpen);
  };

  return { addGlobalQuantity, removeItem, subtractGlobalQuantity, onClick };
};
