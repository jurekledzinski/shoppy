'use client';

import { actionTryCatch } from '@/helpers';

import { logOut } from '@/auth';

export const logout = actionTryCatch(async () => {
  await logOut();
  return { message: 'Logout success', success: true };
});
