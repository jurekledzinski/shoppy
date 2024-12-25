import { OrderSummaryProps } from './types';

export const OrderSummary = ({
  dataOrder,
  methodDelivery,
  methodPayment,
  priceDelivery,
  titleSummary,
  timeDelivery,
}: OrderSummaryProps) => {
  return (
    <>
      <h5>{titleSummary}</h5>
      <p>
        <span>Method payment:</span>
        <span>{methodPayment ?? dataOrder?.methodPayment}</span>
      </p>
      <p>
        <span>Delivery name:</span>
        <span>{methodDelivery}</span>
      </p>
      <p>
        <span>Delivery price:</span>
        <span>{priceDelivery}€</span>
      </p>
      <p>
        <span>Delivery time:</span>
        <span>{timeDelivery}</span>
        <span>{timeDelivery > 1 ? 'days' : 'day'}</span>
      </p>
      <p>Total price: sum total price</p>
    </>
  );
};
