'use server';

import { signIn as signInTemp, signOut as signOutTemp } from './auth';

export async function loginIn() {
  await signInTemp();
}

export async function logOut<R extends boolean = true>(options?: {
  redirectTo?: string;
  redirect?: R;
}) {
  await signOutTemp(options);
}
