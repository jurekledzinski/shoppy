import { ProductDetailsSectionProps } from './types';
import styles from './ProductDetailsSection.module.css';

export const ProductDetailsSection = ({
  children,
}: ProductDetailsSectionProps) => {
  return (
    <section className={styles.section}>
      {children}
      Details section product
    </section>
  );
};
