import { Order } from '@/models';

export type OrderDeliveryProps = {
  className: { [key: string]: string };
  ordersData: Order;
};
