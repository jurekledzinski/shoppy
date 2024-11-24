import 'server-only';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectDB, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { UserForgetPassword, UserResetPassword } from '@/models';

export const POST = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const body = (await request.json()) as UserResetPassword;

  if (!token) return errorMessage(409);

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET_FORGET_PASSWORD!
  ) as UserForgetPassword;

  const collection = getCollectionDb<UserResetPassword>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne<UserResetPassword>({
    email: decoded.email,
  });

  if (!user) return errorMessage(409, 'Incorrect credentials');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);

  await collection.updateOne(
    { email: decoded.email },
    { $set: { password: hash } }
  );

  return Response.json({ success: true });
});
