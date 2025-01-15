import { Order } from '@/models';

export type OrderPaymentProps = {
  className: { [key: string]: string };
  ordersData: Order;
};
