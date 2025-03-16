import { Product, Review, UserRegister } from '@/models';

export type ProductDetailsProps = {
  dataProduct: Product | null;
  dataReviews: Review[];
  dataUser: Omit<UserRegister, 'password'> | null;
  errorReviews?: string;
};
