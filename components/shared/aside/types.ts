import { UserRegister } from '@/models';

export type AsideProps = {
  userData: Omit<UserRegister, 'password' | 'email'> | null;
  guestId: string | null;
};
