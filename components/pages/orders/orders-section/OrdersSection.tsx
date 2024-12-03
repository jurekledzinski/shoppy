import styles from './OrdersSection.module.css';
import { OrdersSectionProps } from './types';

export const OrdersSection = ({ children }: OrdersSectionProps) => {
  return <section className={styles.section}>{children}</section>;
};
