import styles from './ProductsSection.module.css';
import { CardProduct, Section } from '@/components/shared';
import { NoProducts } from '../no-products';
import { omit } from 'lodash';
import { ProductsSectionProps } from './types';

export const ProductsSection = ({ children, data }: ProductsSectionProps) => {
  return (
    <Section>
      {children}
      <div className={styles.container}>
        {data && data.length ? (
          data.map((product) => {
            const filterProduct = omit(product, [
              'description',
              'specification',
            ]);
            return <CardProduct key={product._id} product={filterProduct} />;
          })
        ) : (
          <NoProducts />
        )}
      </div>
    </Section>
  );
};
