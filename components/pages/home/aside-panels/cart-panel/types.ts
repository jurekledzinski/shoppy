import { CartState } from '@/store/cart';
import { MouseEventHandler } from 'react';

export type CartPanelProps = {
  data: CartState;
  addGlobalQuantity: (id: string) => void;
  subtractGlobalQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
