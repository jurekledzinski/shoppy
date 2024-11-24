import { UserSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const register = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = UserSchema.parse(body);

    const res = await fetch('/api/v1/register', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Register successful', success: true };
  }
);
