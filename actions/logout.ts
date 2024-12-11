'use server';
import { logOut } from '@/auth';
import { actionTryCatch } from '@/helpers';

export const logout = actionTryCatch(async () => {
  await logOut({ redirect: false });

  return { message: 'Logout success', success: true };
});
