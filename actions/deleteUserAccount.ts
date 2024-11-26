import { actionTryCatch } from '@/helpers';

export const deleteUserAccount = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const res = await fetch('/api/v1/delete_user_account', {
      body: JSON.stringify(body),
      method: 'DELETE',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Delete user successful', success: true };
  }
);
