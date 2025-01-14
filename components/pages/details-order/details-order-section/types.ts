import { Order } from '@/models';

export type DetailsOrderSectionProps = {
  children: React.ReactNode;
  orderData: Order | null;
  guestSession: string | null;
  userSession: string | null;
};
