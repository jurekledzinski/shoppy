import { ProductCart } from '@/models';

export type CartItemProps = {
  data: ProductCart[];
  addGlobalQuantity?: () => void;
  subtractGlobalQuantity?: () => void;
  removeItem: (id: string) => void;
};
