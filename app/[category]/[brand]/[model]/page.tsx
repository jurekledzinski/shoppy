import { headers } from 'next/headers';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
};

const fetchDetailsProduct = async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });
  return response;
};

const DetailsProduct = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const domain = await getDomain();
  const queryId = (await props.searchParams).id;
  const urlGetProduct = `${domain}/api/v1/product?id=${queryId}`;
  const response = await fetchDetailsProduct(urlGetProduct);
  const data = await response.json();

  console.log('data details product', data);
  return <div>Details product</div>;
};

export default DetailsProduct;
