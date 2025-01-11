import { OrderDeliveryProps } from './types';

export const OrderDelivery = ({
  className,
  ordersData,
}: OrderDeliveryProps) => {
  return (
    <>
      <h4 className={className.title}>Delivery:</h4>
      <ul className={className.list}>
        <li>Method delivery: {ordersData.methodDelivery}</li>
        <li>Price delivery: {ordersData.priceDelivery}€</li>
      </ul>
    </>
  );
};
