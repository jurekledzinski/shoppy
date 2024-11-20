import styles from '@styles/HomePage.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.slider}>Slider</div>
      <div className={styles.brands}>Brands</div>
    </div>
  );
}
