import { MouseEventHandler } from 'react';

export type ModalExpireProps = {
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onSuccess?: () => void;
  isOpen: boolean;
  title: string;
};
