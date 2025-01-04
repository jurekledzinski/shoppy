import { Cart, UserRegister } from '@/models';

export type AsideProps = {
  cartData: Cart | null;
  userData: Omit<UserRegister, 'password' | 'email'> | null;
  guestId: string | null;
};
