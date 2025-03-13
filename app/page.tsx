import styles from '@styles/HomePage.module.css';
import { BasicSlider } from '@/components/shared';
import { fetchBrands } from '@/lib';
import { getDomain } from '@/helpers';
import { TabsCategoriesContainer } from '@/components/pages';

export default async function Home() {
  const domain = await getDomain();
  const urlGetBrands = `${domain}/api/v1/brands`;
  const resBrands = await fetchBrands(urlGetBrands);

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
