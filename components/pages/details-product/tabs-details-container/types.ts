import { Product, Review } from '@/models';

export type TabsDetailsContainerProps = {
  dataProduct: Pick<Product, '_id' | 'specification'>;
  dataReviews: Review[];
  userId: string | undefined;
  userName: string;
};
