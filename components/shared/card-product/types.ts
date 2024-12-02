import { Product } from '@/models';

export type CardProductProps = {
  product: Omit<Product, 'description' | 'specification'>;
};
