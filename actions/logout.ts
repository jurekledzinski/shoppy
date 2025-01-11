'use server';
import { actionTryCatch } from '@/helpers';
import { cookies } from 'next/headers';
import { deleteCookie } from '@/app/_helpers';
import { logOut } from '@/auth';

export const logout = actionTryCatch(async () => {
  const cookieStore = await cookies();
  const cookieStepper = cookieStore.get('stepper');

  if (cookieStepper) deleteCookie(cookieStore, 'stepper');

  await logOut({ redirect: false });

  return { message: 'Logout success', success: true };
});
