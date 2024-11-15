'use server';
export const login = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  console.log('login data action', data);
};
