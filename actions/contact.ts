'use server';

// import { redirect } from 'next/navigation';

export const contact = async (prevState: unknown, formData: FormData) => {
  const body = Object.fromEntries(formData);
  console.log('action data contact', body);

  const res = await fetch('http://localhost:3000/api/v1/contact', {
    body: JSON.stringify(body),
    method: 'POST',
  });

  const data = await res.json();

  console.log('res action data contact', data);

  if (!res.ok) {
    return { message: 'Please enter a valid name' };
  }

  return { ok: 'hello' };
};
