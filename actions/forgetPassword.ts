'use server';
export const forgetPassword = async (
  prevState: unknown,
  formData: FormData
) => {
  const body = Object.fromEntries(formData);
  console.log('action forget password data', body);

  const res = await fetch('http://localhost:3000/api/v1/forget_password', {
    body: JSON.stringify(body),
    method: 'POST',
  });

  if (!res.ok) {
    return { message: 'Something went wrong, please try later' };
  }
};
