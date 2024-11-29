import { MouseEventHandler } from 'react';

export type ModalProps = {
  cancel?: string;
  children?: React.ReactNode;
  confirm?: string;
  isPending?: boolean;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  title: string;
};

export type ModalContainerProps = {
  classButton?: string;
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onSuccess?: () => void;
  title: string;
};
