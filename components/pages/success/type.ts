import { Cart } from '@/models';

export type SectionSuccessProps = {
  cartData: Cart | null;
  orderId: string;
};
