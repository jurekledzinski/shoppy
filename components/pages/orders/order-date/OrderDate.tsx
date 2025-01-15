import { OrderDateProps } from './types';

export const OrderDate = ({ className, ordersData }: OrderDateProps) => {
  return (
    <>
      <h4 className={className.title}>Date order:</h4>
      <ul className={className.list}>
        <li>Date: {new Date(ordersData.createdAt).toLocaleString()}</li>
      </ul>
    </>
  );
};
