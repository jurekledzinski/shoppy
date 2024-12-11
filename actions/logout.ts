'use server';
import { logOut } from '@/auth';

export const logout = async () => {
  await logOut({ redirect: false });

  return { message: 'Logout success', success: true };
};
