import { Product, Review } from '@/models';
import { Session } from 'next-auth';

export type DetailsProductSectionProps = {
  children: React.ReactNode;
  dataProduct: Product;
  dataReviews: Review[];
  dataUser: Session | null;
};
