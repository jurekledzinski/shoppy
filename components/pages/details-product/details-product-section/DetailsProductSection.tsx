import { DetailsProductSectionProps } from './types';
import styles from './DetailsProductSection.module.css';

export const DetailsProductSection = ({
  children,
}: DetailsProductSectionProps) => {
  return (
    <section className={styles.section}>
      {children}
      <div className={styles.container}>
        <div className={styles.boxOne}>1</div>
        <div className={styles.boxTwo}>2</div>
        <div className={styles.boxThree}>3</div>
        <div className={styles.boxFour}>4</div>
      </div>
    </section>
  );
};
