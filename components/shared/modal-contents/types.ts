import { MouseEventHandler } from 'react';

export type ModalDeleteContentProps = {
  children: React.ReactNode;
  cancel?: string;
  confirm?: string;
  isPending?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  title: string;
};

export type ModalWarningContentProps = {
  children: React.ReactNode;
  cancel?: string;
  confirm?: string;
  isPending?: boolean;
  onCancel?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  title: string;
};
