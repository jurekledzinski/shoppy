import { OrderProductsListProps } from './types';

export const OrderProductsList = ({ titleOrders }: OrderProductsListProps) => {
  return (
    <div>
      <h5>{titleOrders}</h5>
    </div>
  );
};
