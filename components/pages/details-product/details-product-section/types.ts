import { Product, Review, UserRegister } from '@/models';

export type DetailsProductSectionProps = {
  children: React.ReactNode;
  dataProduct: Product;
  dataReviews: Review[];
  dataUser: Omit<UserRegister, 'password'> | null;
};
