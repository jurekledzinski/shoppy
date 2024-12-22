import { Order } from '@/models';

export type PlaceOrderSectionProps = {
  children: React.ReactNode;
  orderData: Order | null;
};
