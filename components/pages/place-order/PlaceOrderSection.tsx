import styles from './PlaceOrderSection.module.css';
import { PlaceOrderSectionProps } from './types';

export const PlaceOrderSection = ({
  children,
  orderData,
}: PlaceOrderSectionProps) => {
  console.log('orderData place order section', orderData);
  return <section className={styles.section}>{children}</section>;
};
