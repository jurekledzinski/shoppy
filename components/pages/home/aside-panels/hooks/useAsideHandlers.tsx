import { guestCheckout, userCheckout } from '@/actions';
import { updateSyncCart } from '@/store/cart';
import { useActionStateAndReset } from '@/hooks';
import { UseAsideHandlresProps } from './types';
import { useCancelPanel } from './useCancelPanel';
import { useContinuePanel } from './useContinuePanel';
import { useRedirect } from './useRedirect';
import { useSuccessAction } from './useSuccessAction';

export const useAsideHandlers = ({
  cartState,
  context,
  onDispatch,
  onRedirect,
  onShowToast,
  user,
}: UseAsideHandlresProps) => {
  const actionElement = context.type;

  const { action: actionUserCheckout } = useActionStateAndReset({
    fnAction: userCheckout,
    onResetAction: () => {
      context.onChange(actionElement, false);
      setTimeout(() => onRedirect('/shipping'), 200);
    },
    autoReset: true,
  });

  const { action: actionGuestCheckout } = useActionStateAndReset({
    fnAction: guestCheckout,
    onResetAction: () => {
      context.onChange(actionElement, false);
      updateSyncCart(cartState, user.userId, user.guestId);
      setTimeout(() => onRedirect('/shipping'), 200);
    },
    autoReset: true,
  });

  const onSuccessHandler = useSuccessAction({
    cartState,
    context,
    onDispatch,
    onFormAction: (payload) => actionUserCheckout.formAction(payload),
    onRedirect,
    onShowToast,
    user,
  });

  const onCancelHandler = useCancelPanel({
    context,
    onRedirect,
  });

  const onContinueHandler = useContinuePanel({
    context,
    onFormAction: (payload) => actionGuestCheckout.formAction(payload),
  });

  const onRedirectHandler = useRedirect({ context });

  return {
    onCancelHandler,
    onContinueHandler,
    onRedirectHandler,
    onSuccessHandler,
    isPendingUserCheckout: actionUserCheckout.isPending,
    isPendingGuestCheckout: actionGuestCheckout.isPending,
  };
};
