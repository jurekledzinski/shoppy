import { OrderPaymentProps } from './types';

export const OrderPayment = ({ className, ordersData }: OrderPaymentProps) => {
  return (
    <>
      <h4 className={className.title}>Payment:</h4>
      <ul className={className.list}>
        <li>Method payment: {ordersData.methodPayment}</li>
      </ul>
    </>
  );
};
