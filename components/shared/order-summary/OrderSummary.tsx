import styles from './OrderSummary.module.css';
import { formatText } from '@/helpers';
import { OrderSummaryProps } from './types';

export const OrderSummary = ({
  dataOrder,
  methodDelivery,
  methodPayment,
  priceDelivery,
  titleSummary,
  timeDelivery,
  totalPrice,
}: OrderSummaryProps) => {
  return (
    <>
      <h4 className={styles.title}>{titleSummary}</h4>
      <p className={styles.text}>
        <span>Method payment:</span>
        <span>
          {formatText(methodPayment) ??
            formatText(dataOrder?.methodPayment ?? '')}
        </span>
      </p>
      <p className={styles.text}>
        <span>Delivery name:</span>
        <span>{formatText(methodDelivery)}</span>
      </p>
      <p className={styles.text}>
        <span>Delivery price:</span>
        <span>{priceDelivery}€</span>
      </p>
      <p className={styles.text}>
        <span>Delivery time:</span>
        <span>
          {timeDelivery}
          {timeDelivery > 1 ? ' days' : ' day'}
        </span>
      </p>
      <p className={styles.text}>Total price: {totalPrice + priceDelivery}€</p>
    </>
  );
};
