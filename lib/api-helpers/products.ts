import 'server-only';
import { getDomain } from '@/helpers';
import { fetchProducts } from './fetchApi';
import { endpoints } from './configApi';
import { GetProductsData } from './types';

export const getProducts: GetProductsData = async (domain, category, brand) => {
  const response = await fetchProducts(
    endpoints.products(domain, category, brand)
  );
  return response?.success ? response.data : null;
};

export const getProductsData = async (category: string, brand: string) => {
  const domain = await getDomain();
  const productsData = await getProducts(domain, category, brand);
  return productsData;
};
