'use server';
import { actionTryCatch } from '@/helpers';
import { deleteCookie, getSessionData } from '@/lib';
import { logOut } from '@/auth';

export const logout = actionTryCatch(async () => {
  const { cookieStepper, cookieStore } = await getSessionData();

  if (cookieStepper) deleteCookie(cookieStore, 'stepper');

  await logOut({ redirect: false });

  return { message: 'Logout success', success: true };
});
