import { UpdateUserProfileSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const updateUserProfile = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = UpdateUserProfileSchema.parse(body);

    const res = await fetch('/api/v1/update_user_profile', {
      body: JSON.stringify(parsedData),
      method: 'PATCH',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['update-profile'] },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Update profile successful', success: true };
  }
);
