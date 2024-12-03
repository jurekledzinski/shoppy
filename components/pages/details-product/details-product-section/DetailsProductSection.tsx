import styles from './DetailsProductSection.module.css';
import { DetailsProductSectionProps } from './types';
import {
  StarRating,
  ThumbnailsSlider,
  DisplayOnstock,
} from '@/components/shared';

export const DetailsProductSection = ({
  children,
  data,
}: DetailsProductSectionProps) => {
  return (
    <section className={styles.section}>
      {children}
      <div className={styles.container}>
        <div className={styles.boxOne}>
          <ThumbnailsSlider images={data.images} />
        </div>
        <div className={styles.boxTwo}>
          <h1 className={styles.title}>{data.name}</h1>
          <StarRating initialValue={data.rate} readonly={true} />
          <p className={styles.price}>Price: {data.price}€</p>
          <p className={styles.text}>{data.description}</p>
          <div className={styles.wrapperOnStock}>
            <DisplayOnstock className={styles.onStock} onStock={data.onStock} />
          </div>
        </div>
        <div className={styles.boxThree}>3</div>
        <div className={styles.boxFour}>4</div>
      </div>
    </section>
  );
};
