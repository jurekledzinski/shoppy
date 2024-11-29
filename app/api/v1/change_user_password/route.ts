import 'server-only';
import bcrypt from 'bcrypt';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { UserChangePassword, UserID, UserRegister } from '@/models';

export const PATCH = connectDB(async (request: NextRequest) => {
  const secret = process.env.JWT_SECRET_ACCESS!;
  const cookie = request.cookies.get('auth');
  const body = (await request.json()) as UserChangePassword;

  if (!cookie) return errorMessage(401);

  const decoded = verifyToken(cookie.value, secret) as UserID;

  const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne<UserRegister>({
    _id: new ObjectId(decoded._id),
  });

  if (!user) return errorMessage(409, 'Incorrect credentials');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);

  await collection.updateOne(
    { _id: new ObjectId(decoded._id) },
    { $set: { password: hash } }
  );

  return Response.json({ success: true });
});
