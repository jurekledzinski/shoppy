import { MouseEventHandler } from 'react';

export type LoginPanelProps = {
  onRedirectRegister: MouseEventHandler<HTMLButtonElement>;
  onRedirectForgetPassword: MouseEventHandler<HTMLButtonElement>;
  onSuccess: () => void;
  optionCheckout?: string | null;
};
