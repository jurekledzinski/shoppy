'use server';

import { LoginUserSchema } from '@/models';
import { signIn } from '@/auth';

export const login = async (prevState: unknown, formData: FormData) => {
  const body = Object.fromEntries(formData);

  const parsedData = LoginUserSchema.parse(body);

  await signIn('credentials', {
    email: parsedData.email,
    password: parsedData.password,
    redirect: false,
  });

  return { message: 'Login success', success: true };
};
