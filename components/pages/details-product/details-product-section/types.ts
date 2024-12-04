import { Product, Review } from '@/models';

export type DetailsProductSectionProps = {
  children: React.ReactNode;
  dataProduct: Product;
  dataReviews: Review[];
};
