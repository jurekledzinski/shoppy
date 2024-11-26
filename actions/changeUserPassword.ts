import { PasswordSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const changeUserPassword = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = PasswordSchema.parse(body);

    const res = await fetch('/api/v1/change_user_password', {
      body: JSON.stringify(parsedData),
      method: 'PATCH',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Password change successful', success: true };
  }
);
