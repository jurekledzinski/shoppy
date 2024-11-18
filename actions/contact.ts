'use server';

// import { redirect } from 'next/navigation';

export const contact = async (prevState: unknown, formData: FormData) => {
  const body = Object.fromEntries(formData);

  const res = await fetch('http://localhost:3000/api/v1/contact', {
    body: JSON.stringify(body),
    method: 'POST',
  });

  if (!res.ok) {
    return { message: 'Something went wrong, please try later' };
  }
};
