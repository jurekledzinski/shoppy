import { Order } from '@/models';

export type OrderProductsProps = {
  className: { [key: string]: string };
  ordersData: Order;
};
