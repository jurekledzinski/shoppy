import { OrderProductsList } from '@/components/shared';
import { OrderProductsProps } from './types';

export const OrderProducts = ({
  className,
  ordersData,
}: OrderProductsProps) => {
  return (
    <>
      <h4 className={className.title}>Products:</h4>
      <OrderProductsList items={ordersData.cart?.products ?? []} />
    </>
  );
};
