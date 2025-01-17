import 'server-only';
import { errorMessage } from '@/helpers';
import { UserLogin, UserRegister } from '@/models';
import { NextRequest, NextResponse } from 'next/server';
import { getCollectionDb, connectDB, comparePasswords } from '@/lib';

export const POST = connectDB(async (req: NextRequest) => {
  const body = (await req.json()) as UserLogin;

  const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne<UserRegister>({ email: body.email });

  if (!user) return errorMessage(409, 'User not exist');

  const isMatch = await comparePasswords(body.password, user.password);

  if (!isMatch) return errorMessage(409, 'Incorrect credentials');

  const response = NextResponse.json({
    success: true,
    payload: { name: user.name, email: user.email, id: user._id },
  });

  return response;
});
