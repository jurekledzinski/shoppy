import styles from '@styles/HomePage.module.css';
import { BasicSlider } from '@/components/shared';
import { Brand } from '@/models';
import { getDomain } from './_helpers';
import { TabsCategoriesContainer } from '@/components/pages';
import { tryCatch } from '@/helpers';

type SearchParams = Promise<{ category: string }>;

const fetchBrands = tryCatch<Brand[]>(async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

export default async function Home(props: { searchParams: SearchParams }) {
  const domain = await getDomain();
  const category = (await props.searchParams).category ?? 'phones';
  const urlGetBrands = `${domain}/api/v1/brands?category=${category}`;
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
