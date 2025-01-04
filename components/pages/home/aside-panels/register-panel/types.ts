import { MouseEventHandler } from 'react';

export type RegisterPanelProps = {
  onRedirectLogin: MouseEventHandler<HTMLButtonElement>;
  onSuccessAction: () => void;
};
