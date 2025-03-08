import { AsideState } from '@/store/aside';
import { Cancel, EventButton, Panel, Redirect, User } from '../aside-panels';
import { Cart } from '@/models';
import { CartState } from '@/store/cart';

export type OnSuccessAction = (panel: Panel, value?: string) => void;
export type OnRedirect = (e: EventButton, panel: Redirect) => void;
export type OnCancelAction = (e: EventButton, panel: Cancel) => void;

type Type = 'CLEAR_CART' | 'SET_CART';

export type UseSuccessActionProps = {
  cartState: CartState;
  context: AsideState;
  onDispatch: (type: Type, payload?: Cart) => void;
  onFormAction: (payload: FormData) => void;
  onRedirect: (url: string) => void;
  onShowToast: (message: string, autoClose?: number) => void;
  user: User;
};

export type UseRedirectProps = {
  context: AsideState;
};

export type UseCancelPanelProps = {
  context: AsideState;
  onRedirect: (url: string) => void;
};

export type UseContinuePanelProps = {
  context: AsideState;
  onFormAction: (payload: FormData) => void;
};

export type UseAsideHandlresProps = {
  cartState: CartState;
  context: AsideState;
  onDispatch: (type: Type, payload?: Cart) => void;
  onRedirect: (url: string) => void;
  onShowToast: (message: string, autoClose?: number) => void;
  user: User;
};
