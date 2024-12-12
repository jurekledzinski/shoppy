'use server';
import { actionTryCatch } from '@/helpers';
import { ReviewSchema } from '@/models';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { convertHeadersToObject } from '@/helpers';

export const review = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);
    const fomattedBody = { ...body, rate: parseFloat(body.rate.toString()) };

    const parsedData = ReviewSchema.parse(fomattedBody);

    const headersReview = await headers();
    const header = await convertHeadersToObject(headersReview);

    const res = await fetch('http://localhost:3000/api/v1/review', {
      body: JSON.stringify(parsedData),
      method: 'POST',
      cache: 'no-store',
      headers: { ...header, 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidateTag('get_product_reviews');
    revalidateTag('get_product');

    return { message: 'Review successful', success: true };
  }
);
