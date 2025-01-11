import { CartInventoryPayload } from '@/lib';

export type localProduct = Record<string, number>;

export type ModalControlInventoryCheckProps = {
  cancel: string;
  confirm: string;
  inventoryData: CartInventoryPayload[];
  isPending: boolean;
  title: string;
  onConfirm: (inventory: localProduct, onClose: () => void) => void;
};
