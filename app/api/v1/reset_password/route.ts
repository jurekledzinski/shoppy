import 'server-only';
import bcrypt from 'bcrypt';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { UserForgetPassword, UserResetPassword } from '@/models';

export const POST = connectDB(async (request: NextRequest) => {
  const secret = process.env.JWT_SECRET_FORGET_PASSWORD!;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const body = (await request.json()) as Omit<UserResetPassword, 'token'>;

  if (!token) return errorMessage(409);

  const decoded = verifyToken(token, secret) as UserForgetPassword;

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
