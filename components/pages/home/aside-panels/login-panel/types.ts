import { MouseEventHandler } from 'react';

export type LoginPanelProps = {
  onRedirectRegister: MouseEventHandler<HTMLButtonElement>;
  onRedirectForgetPassword: MouseEventHandler<HTMLButtonElement>;
  onSuccessAction: () => void;
  optionCheckout?: string | null;
};
