import { Alert } from '@/components/shared';
import { OrderSummaryProps } from './types';

export const OrderSummary = ({ className, ordersData }: OrderSummaryProps) => {
  return (
    <>
      <h4 className={className.title}>Summary order:</h4>
      {ordersData.cart?.totalAmountCart ? (
        <ul className={className.list}>
          <li className={className.element}>
            <span>Total amount items:</span>
            {(ordersData.cart?.totalAmountCart ?? 1) > 1
              ? ordersData.cart?.totalAmountCart + ' items'
              : ordersData.cart?.totalAmountCart + ' item'}
          </li>
          <li className={className.element}>
            <span>Total price:</span>
            {ordersData.cart?.totalPriceCart}€
          </li>
          <li className={className.element}>
            <span>Total price with delivery:</span>
            {(ordersData.cart?.totalPriceCart ?? 0) + ordersData.priceDelivery}€
          </li>
        </ul>
      ) : (
        <Alert color="info" marginTop={8}>
          Order not completeted
        </Alert>
      )}
    </>
  );
};
