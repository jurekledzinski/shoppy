import { MouseEventHandler } from 'react';

export type ModalWarningProps = {
  isOpen: boolean;
  title: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
};
