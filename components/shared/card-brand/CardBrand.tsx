import Image from 'next/image';
import Link from 'next/link';
import styles from './CardBrand.module.css';
import { CardBrandProps } from './types';

export const CardBrand = ({ alt, src, title, url }: CardBrandProps) => {
  return (
    <div className={styles.card}>
      <header className={styles.header}>
        <Image
          className={styles.image}
          src={src}
          width={250}
          height={280}
          alt={alt}
          priority={true}
        />
      </header>
      <footer className={styles.footer}>
        <Link className={styles.link} href={url}>
          {title}
        </Link>
      </footer>
    </div>
  );
};
