import styles from './Review.module.css';
import { ReviewProps } from './types';
import { StarRating } from '../star-rating';

export const Review = ({ data }: ReviewProps) => {
  return (
    <div className={styles.review}>
      <header className={styles.header}>
        <p className={styles.name}>{data.userName}</p>
        <span className={styles.date}>
          <StarRating initialValue={data.rate} readonly={true} />
        </span>
      </header>
      <div className={styles.content}>{data.review}</div>
    </div>
  );
};
