import { CartState } from '@/store/cart';

export type CartPanelProps = {
  data: CartState;
  addGlobalQuantity: (id: string) => void;
  subtractGlobalQuantity: (id: string) => void;
  removeItem: (id: string) => void;
};
