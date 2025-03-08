'use client';
import { controlAside, showToast } from '@/helpers';
import { logout } from '@/actions';
import { useActionStateAndReset } from '@/hooks';
import { UseMenuPanelProps } from './types';

export const useMenuPanel = ({
  actionElement,
  context,
  stateOpen,
  onSuccess,
}: UseMenuPanelProps) => {
  const { resetStateAction } = useActionStateAndReset({
    fnAction: logout,
    onResetAction: () => onSuccess(),
  });

  const onCloseAside = () => {
    context.onChange(actionElement, false);
  };
  const onLogout = () => {
    resetStateAction(new FormData());
    showToast('Logout successful');
    context.onChange(actionElement, false);
  };
  const onRedirectContact = () => {
    controlAside(context, 'contact', actionElement, stateOpen);
  };
  const onRedirectLogin = () => {
    controlAside(context, 'login', actionElement, stateOpen);
  };
  const onRedirectRegister = () => {
    controlAside(context, 'register', actionElement, stateOpen);
  };

  return {
    onCloseAside,
    onLogout,
    onRedirectContact,
    onRedirectLogin,
    onRedirectRegister,
  };
};
