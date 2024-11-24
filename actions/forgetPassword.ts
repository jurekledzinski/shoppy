import { actionTryCatch } from '@/helpers';
import { ForgetPasswordSchema } from '@/models';

export const forgetPassword = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = ForgetPasswordSchema.parse(body);

    const res = await fetch('/api/v1/forget_password', {
      body: JSON.stringify(parsedData),
      method: 'POST',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return {
      message: 'Request send successfully, please check your email',
      success: true,
    };
  }
);
