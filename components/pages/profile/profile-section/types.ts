import { UserRegister } from '@/models';

export type ProfileSectionProps = {
  user: Omit<UserRegister, 'password'> | null;
};
