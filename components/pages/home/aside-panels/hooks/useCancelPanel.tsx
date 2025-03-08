import { EventButton } from '../aside-panels';
import { OnCancelAction, UseCancelPanelProps } from './types';

export const useCancelPanel = ({
  context,
  onRedirect,
}: UseCancelPanelProps) => {
  const actionElement = context.type;

  const onCancelProccedCheckout = () => {
    context.onChange(actionElement, false);
  };

  const onCancelResetPassword = (e: EventButton) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.search = '';
    onRedirect(url.pathname);

    setTimeout(() => context.onChange(actionElement, false), 1000);
  };

  const onCancelAction: OnCancelAction = (e, panel) => {
    switch (panel) {
      case 'procced-checkout':
        return onCancelProccedCheckout();
      case 'reset_password':
        return onCancelResetPassword(e);
      default:
        break;
    }
  };

  return onCancelAction;
};
