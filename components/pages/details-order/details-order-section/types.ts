import { Cart, Order } from '@/models';

export type DetailsOrderSectionProps = {
  cartData: Cart | null;
  children: React.ReactNode;
  orderData: Order | null;
};
