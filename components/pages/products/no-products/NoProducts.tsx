import styles from './NoProducts.module.css';

export const NoProducts = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>No products found</h3>
      <p className={styles.text}>
        At the moment there is no products from this brand.
      </p>
    </div>
  );
};
