import { MouseEventHandler } from 'react';

export type ModalWarningProps = {
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  title: string;
};
