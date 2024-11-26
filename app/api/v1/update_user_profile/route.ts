import 'server-only';
import { NextRequest } from 'next/server';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { UserID, UserRegister, UserUpdateProfile } from '@/models';
import { ObjectId } from 'mongodb';

export const PATCH = connectDB(async (request: NextRequest) => {
  const secret = process.env.JWT_SECRET_ACCESS!;
  const cookie = request.cookies.get('auth');
  const body = (await request.json()) as UserUpdateProfile;

  if (!cookie) return errorMessage(401);

  const decoded = verifyToken(cookie.value, secret) as UserID;

  const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

  if (!collection) return errorMessage(500);

  const result = await collection.updateOne(
    { _id: new ObjectId(decoded._id) },
    { $set: { email: body.email, name: body.name } }
  );

  console.log('result', result);

  console.log('cookie api update profile', cookie);
  return Response.json({ success: true });
});
