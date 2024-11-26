import { ContactEmailSchema } from '@/models';
import { actionTryCatch } from '@/helpers';

export const contact = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = ContactEmailSchema.parse(body);

    const res = await fetch('/api/v1/contact', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Message send successfully', success: true };
  }
);
