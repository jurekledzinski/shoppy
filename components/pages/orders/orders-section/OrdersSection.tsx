import styles from './OrdersSection.module.css';
import { OrdersSectionProps } from './types';

export const OrdersSection = ({ children, ordersData }: OrdersSectionProps) => {
  console.log('All user orders OrdersSection', ordersData);
  return <section className={styles.section}>{children}</section>;
};
