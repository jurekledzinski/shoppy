import Image from 'next/image';
import Link from 'next/link';
import styles from './CardProduct.module.css';
import { AddToCartController } from '../';
import { CardProductProps } from './types';
import { DisplayOnstock } from '../display-onstock';
import { StarRating } from '../star-rating';

export const CardProduct = ({ product }: CardProductProps) => {
  const { category, brand, name, _id, images, rate, price, onStock } = product;

  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <Link
          className={styles.link}
          href={`/${category}/${brand}/${encodeURIComponent(
            name
          ).toLowerCase()}?id=${_id}`}
          prefetch={true}
        >
          <Image
            className={styles.image}
            src={images[0]}
            width={200}
            height={200}
            alt="Image phone"
            priority={true}
            sizes="(max-width: 575px) 200px, 200px"
          />
        </Link>
      </header>
      <div className={styles.content}>
        <h5 className={styles.title}>{name}</h5>
        <StarRating initialValue={rate} readonly={true} />
        <p className={styles.text}>Price: {price}€</p>
      </div>
      <footer className={styles.footer}>
        <AddToCartController
          data={{
            _id,
            name,
            onStock,
            price,
            quantity: 1,
            image: images[0],
          }}
        />
        <DisplayOnstock className={styles.onStock} data={{ _id, onStock }} />
      </footer>
    </div>
  );
};
