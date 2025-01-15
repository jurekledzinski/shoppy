import styles from './OrderAddress.module.css';
import { OrderAddressProps } from './types';

export const OrderAddress = ({
  dataOrder,
  titleAddress,
}: OrderAddressProps) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{titleAddress}</h4>
      <p className={styles.text}>
        {dataOrder?.name} {dataOrder?.surname}
      </p>
      <p className={styles.text}>{dataOrder?.street}</p>
      <p className={styles.text}>
        {dataOrder?.postCode} {dataOrder?.city}
      </p>
      <p className={styles.text}>{dataOrder?.country}</p>
    </div>
  );
};
