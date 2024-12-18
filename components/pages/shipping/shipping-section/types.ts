import { UserRegister } from '@/models';

export type ShippingSectionProps = {
  children: React.ReactNode;
  userData: Omit<UserRegister, 'password'> | null;
};
