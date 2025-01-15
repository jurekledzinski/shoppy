import { UserRegister } from '@/models';

export type ProfileSectionProps = {
  children: React.ReactNode;
  userData: Omit<UserRegister, 'password'> | null;
};
