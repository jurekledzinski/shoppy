'use server';
import { UserSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const registser = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = UserSchema.parse(body);

    const res = await fetch('http://localhost:3000/api/v1/register', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Register successful', success: true };
  }
);
