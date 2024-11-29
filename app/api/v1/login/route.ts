import 'server-only';
import { errorMessage } from '@/helpers';
import { UserLogin, UserRegister } from '@/models';
import { NextRequest, NextResponse } from 'next/server';
import {
  getCollectionDb,
  connectDB,
  comparePasswords,
  createToken,
} from '@/lib';

export const POST = connectDB(async (req: NextRequest) => {
  const body = (await req.json()) as UserLogin;

  const collection = getCollectionDb<UserRegister>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne({ email: body.email });

  if (!user) return errorMessage(409, 'Incorrect credentials');

  const isMatch = await comparePasswords(body.password, user.password);

  if (!isMatch) return errorMessage(409, 'Incorrect credentials');

  const token = createToken(user._id);

  const response = NextResponse.json({
    success: true,
    payload: { email: user.email, id: user._id, name: user.name },
  });

  response.cookies.set('auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
    sameSite: 'strict',
  });

  return response;
});
