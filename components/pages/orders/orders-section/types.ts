import { Order } from '@/models';

export type OrdersSectionProps = {
  children: React.ReactNode;
  ordersData: Order[] | null;
};
