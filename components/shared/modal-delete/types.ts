import { MouseEventHandler } from 'react';

export type ModalDeleteProps = {
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  isPending?: boolean;
  isSuccess?: boolean;
  textButton: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  onSuccess?: () => void;
  title: string;
};
