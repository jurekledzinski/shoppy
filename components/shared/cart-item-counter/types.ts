import { ProductCart } from '@/models';

export type CartItemCounterProps = {
  className?: string;
  localQuantity?: boolean;
  addLocalQuantity: () => void;
  subtractLocalQuantity: () => void;
  addGlobalQuantity: () => void;
  subtractGlobalQuantity: () => void;
  quanity: number;
  onStock: number;
};
