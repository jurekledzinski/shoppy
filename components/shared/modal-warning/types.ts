import { MouseEventHandler } from 'react';

export type ModalWarningProps = {
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  isOpen: boolean;
  title: string;
};
