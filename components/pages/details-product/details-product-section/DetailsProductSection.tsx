import { DetailsProductSectionProps } from './types';
import styles from './DetailsProductSection.module.css';

export const DetailsProductSection = ({
  children,
}: DetailsProductSectionProps) => {
  return (
    <section className={styles.section}>
      {children}
      Details section product
    </section>
  );
};
