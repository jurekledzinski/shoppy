import 'server-only';
import { NextRequest, NextResponse } from 'next/server';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { UserID, UserRegister } from '@/models';
import { errorMessage } from '@/helpers';
import { ObjectId } from 'mongodb';

export const DELETE = connectDB(async (request: NextRequest) => {
  const secret = process.env.JWT_SECRET_ACCESS!;
  const cookie = request.cookies.get('auth');

  if (!cookie) return errorMessage(401);

  const decoded = verifyToken(cookie.value, secret) as UserID;

  const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

  if (!collection) return errorMessage(500);

  const result = await collection.deleteOne({ _id: new ObjectId(decoded._id) });

  console.log('result delete api', result);

  console.log('cookie api delete user', cookie);

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete('auth');

  return response;
});
