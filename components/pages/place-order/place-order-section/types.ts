import { Cart, Order } from '@/models';

export type PlaceOrderSectionProps = {
  cartData: Cart | null;
  children: React.ReactNode;
  orderData: Order | null;
};
