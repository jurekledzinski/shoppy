import { controlAside } from '@/helpers';
import { EventButton } from '../aside-panels';
import { OnRedirect, UseRedirectProps } from './types';

export const useRedirect = ({ context }: UseRedirectProps) => {
  const actionElement = context.type;
  const stateOpen = context.value;

  const onRedirectForgerPassword = (e: EventButton) => {
    e.preventDefault();
    controlAside(context, 'forget-password', actionElement, stateOpen);
  };

  const onRedirectLogin = (e: EventButton) => {
    e.preventDefault();
    controlAside(context, 'login', actionElement, stateOpen);
  };

  const onRedirectRegister = (e: EventButton) => {
    e.preventDefault();
    controlAside(context, 'register', actionElement, stateOpen);
  };

  const onRedirect: OnRedirect = (e, panel) => {
    switch (panel) {
      case 'forget-password':
        return onRedirectForgerPassword(e);
      case 'login':
        return onRedirectLogin(e);
      case 'register':
        return onRedirectRegister(e);
      default:
        break;
    }
  };

  return onRedirect;
};
