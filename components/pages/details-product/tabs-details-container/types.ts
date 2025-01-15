import { Product, Review } from '@/models';

export type TabsDetailsContainerProps = {
  dataProduct: Pick<Product, '_id' | 'specification'>;
  dataReviews: Review[];
  errorReviews?: { message: string; success: boolean };
  userId: string | undefined;
  userName: string;
};
