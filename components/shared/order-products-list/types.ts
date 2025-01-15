import { Cart } from '@/models';

export type OrderProductsListProps = {
  className?: string;
  items: Cart['products'];
  titleOrders: string;
};
