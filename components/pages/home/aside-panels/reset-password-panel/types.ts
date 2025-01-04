import { MouseEventHandler } from 'react';

export type ResetPasswordPanelProps = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSuccessAction: (message: string) => void;
};
