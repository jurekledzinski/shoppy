import { AsideState } from '@/store/aside';
import { CartState } from '@/store/cart';
import { MouseEvent } from 'react';

export type EventButton = MouseEvent<HTMLButtonElement>;

export type Cancel = 'procced-checkout' | 'reset_password';

export type Panel =
  | 'cart'
  | 'contact'
  | 'forget-password'
  | 'menu'
  | 'login'
  | 'register'
  | 'reset_password';

export type Redirect = 'forget-password' | 'login' | 'register';

export type Type = 'INCREASE_ITEM' | 'REMOVE_ITEM' | 'SUBTRACT_ITEM';

export type User = {
  guestId: string;
  userName: string;
  userId: string;
};

export type AsidePanelsProps = {
  cartState: CartState;
  context: AsideState;
  isPending?: boolean;
  onCancel: (e: EventButton, panel: Cancel) => void;
  onContinue: (name: string) => void;
  onDispatch: (type: Type, payload: { id: string }) => void;
  onSuccess: (panel: Panel, value?: string) => void;
  onRedirect: (e: EventButton, panel: Redirect) => void;
  user: User;
};
