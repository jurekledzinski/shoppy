import styles from '@styles/HomePage.module.css';
import { BasicSlider } from '@/components/shared';
import { TabsCategoriesContainer } from '@/components/pages';
import { headers } from 'next/headers';

type SearchParams = Promise<{ category: string }>;

const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
};

const fetchBrands = async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });
  return response;
};

export default async function Home(props: { searchParams: SearchParams }) {
  const domain = await getDomain();
  const category = (await props.searchParams).category ?? 'phones';
  const urlGetBrands = `${domain}/api/v1/brands?category=${category}`;
  const response = await fetchBrands(urlGetBrands);
  const brands = await response.json();

  return (
    <div className={styles.home}>
      <div className={styles.slider}>
        <BasicSlider />
      </div>
      <div className={styles.brands}>
        <h3 className={styles.title}>Our products</h3>
        <TabsCategoriesContainer
          data={response.ok ? brands.payload : []}
          {...(!response.ok && {
            error: { message: 'Something went wrong', success: false },
          })}
        />
      </div>
    </div>
  );
}
