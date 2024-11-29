import styles from '@styles/HomePage.module.css';
import { BasicSlider } from '@/components/shared';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.slider}>
        <BasicSlider />
      </div>
      <div className={styles.brands}>Brands</div>
    </div>
  );
}
