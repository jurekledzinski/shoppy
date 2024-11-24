import { LoginUserSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const login = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = LoginUserSchema.parse(body);

    const res = await fetch('/api/v1/login', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    return {
      message: 'Login successful',
      success: true,
      body: data.payload,
    };
  }
);
