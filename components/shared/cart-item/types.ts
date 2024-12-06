import { ProductCart } from '@/models';

export type CartItemProps = {
  data: ProductCart;
  addGlobalQuantity?: (id: string) => void;
  subtractGlobalQuantity?: (id: string) => void;
  removeItem: (id: string) => void;
  disabledButtonMinus?: boolean;
  disabledButtonPlus?: boolean;
};
