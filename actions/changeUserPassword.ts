'use server';
import { PasswordSchema } from '@/models';
import { actionTryCatch } from '@/helpers';
import { headers } from 'next/headers';
import { convertHeadersToObject } from '@/helpers';
import { getDomain } from '@/app/_helpers';

export const changeUserPassword = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);
    const domain = await getDomain();

    const parsedData = PasswordSchema.parse(body);

    const headersPassword = await headers();
    const header = await convertHeadersToObject(headersPassword);
    const url = `${domain}/api/v1/change_user_password`;

    const res = await fetch(url, {
      body: JSON.stringify(parsedData),
      method: 'PATCH',
      headers: { ...header, 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return { message: 'Password change successful', success: true };
  }
);
