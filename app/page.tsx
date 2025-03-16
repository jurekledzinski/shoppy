import styles from '@styles/Globals.module.css';
import { BasicSlider } from '@/components/shared';
import { endpoints, fetchBrands } from '@/lib';
import { getDomain } from '@/helpers';
import { TabsCategoriesContainer } from '@/components/pages';

export default async function Home() {
  const domain = await getDomain();
  const resBrands = await fetchBrands(endpoints.brands(domain));

  return (
    <div className={styles.home}>
      <div className={styles.slider}>
        <BasicSlider />
      </div>
      <div className={styles.brands}>
        <h3 className={styles.title}>Our products</h3>
        <TabsCategoriesContainer
          data={resBrands.success ? resBrands.data ?? [] : []}
          {...(!resBrands.success && {
            error: resBrands,
          })}
        />
      </div>
    </div>
  );
}
