'use server';
export const registser = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('action register data', data);
};
