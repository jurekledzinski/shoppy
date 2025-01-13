import { MouseEventHandler } from 'react';

export type ModalWarningProps = {
  isOpen: boolean;
  title: string;
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
};
