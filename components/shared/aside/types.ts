import { Cart, UserRegister } from '@/models';

export type AsideProps = {
  cartData: Omit<Cart, 'cartId'> | null;
  userData: Omit<UserRegister, 'password' | 'email'> | null;
  guestId: string | null;
};
