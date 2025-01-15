import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderStatusProps } from './types';

export const OrderStatus = ({ className, ordersData }: OrderStatusProps) => {
  return (
    <>
      <h4 className={className.title}>Status order:</h4>
      <ul className={className.list}>
        <li className={className.element}>
          <span className={className.subTitle}>Payment:</span>
          {ordersData.isPaid ? (
            <span className={className.check}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <span className={className.unCheck}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          )}
        </li>
        <li className={className.element}>
          <span className={className.subTitle}>Send:</span>
          {ordersData.isSent ? (
            <span className={className.check}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <span className={className.unCheck}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          )}
        </li>
        <li className={className.element}>
          <span className={className.subTitle}>Delivered:</span>
          {ordersData.isDelivered ? (
            <span className={className.check}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <span className={className.unCheck}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          )}
        </li>
      </ul>
    </>
  );
};
