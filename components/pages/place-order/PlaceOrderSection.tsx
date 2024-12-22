import { PlaceOrderSectionProps } from './types';
import styles from './PlaceOrderSection.module.css';

export const PlaceOrderSection = ({
  children,
  orderData,
}: PlaceOrderSectionProps) => {
  console.log('orderData place order section', orderData);
  return <section className={styles.section}>{children}</section>;
};
