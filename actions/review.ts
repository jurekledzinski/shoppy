import { actionTryCatch } from '@/helpers';
import { ReviewSchema } from '@/models';

export const review = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);
    const fomattedBody = { ...body, rate: parseFloat(body.rate.toString()) };

    const parsedData = ReviewSchema.parse(fomattedBody);

    const res = await fetch('/api/v1/review', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Review successful', success: true };
  }
);
