'use client';
import { actionTryCatch } from '@/helpers';
import { ResetPasswordSchema, UserResetPassword } from '@/models';

export const resetPassword = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData) as UserResetPassword;

    ResetPasswordSchema.parse(body);

    const apiUrl = `/api/v1/reset_password/?token=${body.token}`;
    delete body.token;

    const res = await fetch(apiUrl, {
      body: JSON.stringify(body),
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return {
      message: 'Password reset successfully',
      success: true,
    };
  }
);
