'use server';
export const registser = async (formData: FormData) => {
  const body = Object.fromEntries(formData);
  console.log('action register data', body);

  const res = await fetch('http://localhost:3000/api/v1/register', {
    body: JSON.stringify(body),
    method: 'POST',
  });

  if (!res.ok) {
    return { message: 'Something went wrong, please try later' };
  }
};
