import { controlAside, redirectWithQueries } from '@/helpers';
import { getSession } from 'next-auth/react';
import { initialState, updateSyncCart } from '@/store/cart';
import { OnSuccessAction, UseSuccessActionProps } from './types';
import { startTransition } from 'react';
import { useSetTimeoutController } from '@/hooks';

export const useSuccessAction = ({
  cartState,
  context,
  onDispatch,
  onFormAction,
  onRedirect,
  onShowToast,
  user,
}: UseSuccessActionProps) => {
  const actionElement = context.type;
  const stateOpen = context.value;
  const optionCheckout = context.checkout;
  const { guestId, userName, userId } = user;

  const setControlTimeout = useSetTimeoutController();

  const onSuccessActionCart = () => {
    if (userName && userId) {
      return startTransition(() => onFormAction(new FormData()));
    }
    context.onChange(actionElement, false);
    onRedirect('/shipping');
  };

  const onSuccessActionContact = (message?: string) => {
    if (!message) return;
    onShowToast(message);
    context.onChange(actionElement, false);
  };

  const onSuccessActionForgetPassword = (message?: string) => {
    if (!message) return;
    onShowToast(message, 10000);
    context.onChange(actionElement, false);
  };

  const onSuccessActionLogin = async () => {
    onShowToast('Login successful');
    context.onChange(actionElement, false);

    const updatedSession = await getSession();
    const userID = updatedSession?.user.id;

    const resultCart = await updateSyncCart(cartState, userID, guestId);
    onDispatch('SET_CART', resultCart?.payload ?? initialState.cart);

    if (optionCheckout === 'login') {
      return setControlTimeout(() => onRedirect('/shipping'), 200);
    }

    const url = redirectWithQueries();
    onRedirect(url);
  };

  const onSuccessActionMenu = () => {
    onDispatch('CLEAR_CART');
    const url = redirectWithQueries();
    setControlTimeout(() => onRedirect(url), 1000);
  };

  const onSuccessActionRegister = () => {
    onShowToast('Register successful');
    context.onChange(actionElement, false);
    if (optionCheckout === 'register') {
      controlAside(context, 'login', actionElement, stateOpen, 'login');
    }
  };

  const onSuccessActionResetPassword = (message?: string) => {
    if (!message) return;
    onShowToast(message);
    const url = new URL(window.location.href);
    url.search = '';
    onRedirect(url.pathname);
    setControlTimeout(
      () => controlAside(context, 'login', actionElement, stateOpen),
      1000
    );
  };

  const onSuccessAction: OnSuccessAction = (panel, value) => {
    switch (panel) {
      case 'cart':
        return onSuccessActionCart();
      case 'contact':
        return onSuccessActionContact(value);
      case 'forget-password':
        return onSuccessActionForgetPassword(value);
      case 'login':
        return onSuccessActionLogin();
      case 'menu':
        return onSuccessActionMenu();
      case 'register':
        return onSuccessActionRegister();
      case 'reset_password':
        return onSuccessActionResetPassword(value);
      default:
        break;
    }
  };
  return onSuccessAction;
};
