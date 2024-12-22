import styles from './DetailsOrderSection.module.css';
import { DetailsOrderSectionProps } from './types';

export const DetailsOrderSection = ({
  children,
  orderData,
}: DetailsOrderSectionProps) => {
  console.log('DetailsOrderSection component', orderData);
  return <section className={styles.section}>{children}</section>;
};
