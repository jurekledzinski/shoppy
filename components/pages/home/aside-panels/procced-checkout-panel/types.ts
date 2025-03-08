import { MouseEventHandler } from 'react';

export type ProccedCheckoutPanelProps = {
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onContinue: (name: string) => void;
  isPending?: boolean;
};
