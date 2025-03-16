import 'server-only';
import { endpoints } from './configApi';
import { fetchDetailsProduct, fetchProductReviews } from './fetchApi';
import { getDomain } from '@/helpers';
import { GetProductData, GetReviewData } from './types';
import { getSessionData } from '../actions-helpers';
import { getUserData } from './proccedCheckout';

export const getProductData: GetProductData = async (domain, id) => {
  const response = await fetchDetailsProduct(endpoints.product(domain, id));
  return response?.success ? response.data : null;
};

export const getReviewData: GetReviewData = async (domain, id) => {
  const response = await fetchProductReviews(endpoints.review(domain, id));
  return response?.success ? response.data : null;
};

export const getDetailsProductData = async (productId: string) => {
  const domain = await getDomain();
  const { session, headersData } = await getSessionData();

  const productData = await getProductData(domain, productId);

  const reviewData = await getReviewData(domain, productId);

  const userData = await getUserData(session, domain, headersData);

  return { productData, reviewData, userData };
};
