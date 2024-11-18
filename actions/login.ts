'use server';
export const login = async (formData: FormData) => {
  const body = Object.fromEntries(formData);
  console.log('login data action', body);

  const res = await fetch('http://localhost:3000/api/v1/login', {
    body: JSON.stringify(body),
    method: 'POST',
  });

  if (!res.ok) {
    return { message: 'Something went wrong, please try later' };
  }
};
