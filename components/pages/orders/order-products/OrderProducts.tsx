import { OrderProductsList } from '@/components/shared';
import { OrderProductsProps } from './types';

export const OrderProducts = ({ ordersData }: OrderProductsProps) => {
  return (
    <>
      <OrderProductsList
        items={ordersData.cart?.products ?? []}
        titleOrders="Products:"
      />
    </>
  );
};
