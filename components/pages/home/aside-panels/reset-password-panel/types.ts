import { MouseEventHandler } from 'react';

export type ResetPasswordPanelProps = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSuccess: (message: string) => void;
};
