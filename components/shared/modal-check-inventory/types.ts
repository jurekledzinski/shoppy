export type ModalCheckInventoryProps = {
  cancel?: string;
  confirm?: string;
  children?: React.ReactNode;
  onConfirm: (onClose: () => void) => void;
  isOpen: boolean;
  title: string;
};
