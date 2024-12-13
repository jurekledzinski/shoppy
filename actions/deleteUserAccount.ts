'use server';
import { actionTryCatch } from '@/helpers';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { convertHeadersToObject } from '@/helpers';
import { getDomain } from '@/app/_helpers';

export const deleteUserAccount = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);
    const domain = await getDomain();

    const headersUser = await headers();
    const header = await convertHeadersToObject(headersUser);
    const url = `${domain}/api/v1/delete_user_account`;

    const res = await fetch(url, {
      body: JSON.stringify(body),
      method: 'DELETE',
      headers: { ...header, 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    revalidateTag('get_user');

    return { message: 'Delete user successful', success: true };
  }
);
