import styles from './ProductsSection.module.css';
import { CardProduct, NoData, Section } from '@/components/shared';
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
          <NoData
            text="At the moment there is no products from this brand."
            title="No products found"
          />
        )}
      </div>
    </Section>
  );
};
