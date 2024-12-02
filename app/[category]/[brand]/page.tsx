import { headers } from 'next/headers';
import { ProductsSection } from '@/components/pages';

type Params = Promise<{ category: string; brand: string }>;

const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  return `${protocol}://${host}`;
};

const fetchProducts = async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });
  return response;
};

const Products = async (props: { params: Params }) => {
  const domain = await getDomain();
  const params = await props.params;
  const urlGetProducts = `${domain}/api/v1/products?category=${params.category}&brand=${params.brand}`;
  const response = await fetchProducts(urlGetProducts);
  const products = await response.json();

  return <ProductsSection data={response.ok ? products.payload : []} />;
};

export default Products;
