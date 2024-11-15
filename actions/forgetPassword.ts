'use server';
export const forgetPassword = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('action forget password data', data);
};
