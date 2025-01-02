import { MouseEventHandler } from 'react';

export type RegisterPanelProps = {
  onRedirectLogin: MouseEventHandler<HTMLButtonElement>;
  onSuccess: () => void;
};
