import styles from './DetailsProductSection.module.css';
import { CartQuantityContoller } from '../cart-quantity-contoller';
import { DetailsProductSectionProps } from './types';
import {
  StarRating,
  ThumbnailsSlider,
  DisplayOnstock,
} from '@/components/shared';
import { TabsDetailsContainer } from '../tabs-details-container';

export const DetailsProductSection = ({
  children,
  dataProduct,
  dataReviews,
}: DetailsProductSectionProps) => {
  return (
    <section className={styles.section}>
      {children}
      <div className={styles.container}>
        <div className={styles.boxOne}>
          <ThumbnailsSlider images={dataProduct.images} />
        </div>
        <div className={styles.boxTwo}>
          <h1 className={styles.title}>{dataProduct.name}</h1>
          <StarRating initialValue={dataProduct.rate} readonly={true} />
          <p className={styles.price}>Price: {dataProduct.price}€</p>
          <p className={styles.text}>{dataProduct.description}</p>
          <CartQuantityContoller
            data={{
              quantity: 1,
              _id: dataProduct._id,
              image: dataProduct.images[0],
              name: dataProduct.name,
              onStock: dataProduct.onStock,
              price: dataProduct.price,
            }}
          />
          <div className={styles.wrapperOnStock}>
            <DisplayOnstock
              className={styles.onStock}
              onStock={dataProduct.onStock}
            />
          </div>
        </div>
        <div className={styles.boxThree}>
          <TabsDetailsContainer
            dataProduct={{
              _id: dataProduct._id,
              specification: dataProduct.specification,
            }}
            dataReviews={dataReviews}
            userId="userId123"
          />
        </div>
      </div>
    </section>
  );
};
