import styles from './ProductsSection.module.css';
import { CardProduct } from '@/components/shared';
import { omit } from 'lodash';
import { ProductsSectionProps } from './types';

export const ProductsSection = ({ data }: ProductsSectionProps) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {data.map((product) => {
          const filterProduct = omit(product, ['description', 'specification']);
          return <CardProduct key={product._id} product={filterProduct} />;
        })}
      </div>
    </section>
  );
};
