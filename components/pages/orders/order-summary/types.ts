import { Order } from '@/models';

export type OrderSummaryProps = {
  className: { [key: string]: string };
  ordersData: Order;
};
