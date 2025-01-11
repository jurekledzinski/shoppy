import styles from './DetailsProductSection.module.css';
import { CartQuantityContoller } from '../cart-quantity-contoller';
import { DetailsProductSectionProps } from './types';
import { TabsDetailsContainer } from '../tabs-details-container';
import {
  StarRating,
  ThumbnailsSlider,
  DisplayOnstock,
  AlertError,
  Section,
} from '@/components/shared';

export const DetailsProductSection = ({
  children,
  dataProduct,
  dataReviews,
  dataUser,
  errorReviews,
}: DetailsProductSectionProps) => {
  return (
    <Section>
      {children}

      {dataProduct ? (
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
                data={{ _id: dataProduct._id, onStock: dataProduct.onStock }}
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
              errorReviews={errorReviews}
              userId={dataUser ? dataUser._id : ''}
              userName={dataUser ? dataUser.name : ''}
            />
          </div>
        </div>
      ) : (
        <AlertError>Failed to load product details</AlertError>
      )}
    </Section>
  );
};
