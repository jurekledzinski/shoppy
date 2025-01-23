import { Order } from '@/models';

export type OrdersListProps = {
  onSelectValue: (id: string) => void;
  ordersData: Order[] | null;
  selectedValue: string | null;
};
