import 'server-only';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { UserID, UserRegister } from '@/models';

export const GET = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const cookie = request.cookies.get('auth');
  const userId = searchParams.get('id');
  const secret = process.env.JWT_SECRET_ACCESS!;

  if (!cookie) return errorMessage(401);
  if (!userId) return errorMessage(401);

  const decoded = verifyToken(cookie.value, secret) as UserID;

  const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne<UserRegister>(
    {
      _id: new ObjectId(decoded._id),
    },
    { projection: { password: false } }
  );

  if (!user) return errorMessage(409, 'Incorrect credentials');

  return Response.json({ success: true, payload: user });
});
