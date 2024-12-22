import { Order, UserRegister } from '@/models';

export type ShippingSectionProps = {
  children: React.ReactNode;
  guestId: string | null;
  userData: Omit<UserRegister, 'password'> | null;
  orderData: Order | null;
};
