import styles from './NoProducts.module.css';
import { NoDataProps } from './types';

export const NoData = ({ text, title }: NoDataProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

// No products found
// At the moment there is no products from this brand.
