import { Product, Review, UserRegister } from '@/models';

export type DetailsProductSectionProps = {
  children: React.ReactNode;
  dataProduct: Product | null;
  dataReviews: Review[];
  dataUser: Omit<UserRegister, 'password'> | null;
  errorReviews?: string;
};
