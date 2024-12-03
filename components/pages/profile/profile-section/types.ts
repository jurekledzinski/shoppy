import { UserRegister } from '@/models';

export type ProfileSectionProps = {
  children: React.ReactNode;
  user: Omit<UserRegister, 'password'> | null;
};
