'use server';

import { signIn as signInTemp, signOut as signOutTemp } from './auth';

export async function loginIn() {
  await signInTemp();
}

export async function logOut() {
  await signOutTemp({ redirect: true, redirectTo: '/' });
}
