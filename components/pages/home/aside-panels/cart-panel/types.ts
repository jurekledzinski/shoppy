import { AsideState, AsideType } from '@/store/aside';
import { CartAction, CartState } from '@/store/cart';
import { Dispatch } from 'react';

export type CartPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  data: CartState;
  dispatch: Dispatch<CartAction>;
  userId: string;
  userName: string;
  guestId: string | null;
  stateOpen: boolean;
  onSuccess: () => void;
  state: CartState;
  isPending?: boolean;
};

export type UseCartPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  dispatch: Dispatch<CartAction>;
  stateOpen: boolean;
  onSuccess: () => void;
  userId: string;
  userName: string;
  guestId: string | null;
  state: CartState;
};
