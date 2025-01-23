import styles from './ProdcutsContainer.module.css';
import { CardProduct, NoData } from '@/components/shared';
import { omit } from 'lodash';
import { ProductsContainerProps } from './types';

export const ProdcutsContainer = ({ data }: ProductsContainerProps) => {
  return (
    <div className={styles.container}>
      {data && data.length ? (
        data.map((product) => {
          const filterProduct = omit(product, ['description', 'specification']);
          return <CardProduct key={product._id} product={filterProduct} />;
        })
      ) : (
        <NoData
          text="At the moment there is no products from this brand."
          title="No products found"
        />
      )}
    </div>
  );
};
