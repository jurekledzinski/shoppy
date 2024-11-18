import { type NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  console.log('data api login body', data);
  return Response.json({ message: 'Success login' });
};
