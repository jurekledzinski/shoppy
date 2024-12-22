import { UserRegister } from '@/models';
import { JWTPayload } from 'jose';

export type AsideProps = {
  userData: Omit<UserRegister, 'password' | 'email'> | null;
  guestId: JWTPayload | null;
};
