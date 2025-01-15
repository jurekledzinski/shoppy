import { ProductCart } from '@/models';

export type DisplayOnstockProps = {
  className?: string;
  data: Pick<ProductCart, '_id' | 'onStock'>;
};
