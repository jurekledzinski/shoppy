import type { NextRequest } from 'next/server';
import { getCollectionDb, connectDB } from '@/lib';
import bcrypt from 'bcrypt';
import { UserRegister } from '@/models';
import { errorMessage } from '@/helpers';

export const POST = connectDB(async (req: NextRequest) => {
  const body = (await req.json()) as UserRegister;

  const collection = getCollectionDb<UserRegister>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne<UserRegister>({ email: body.email });

  if (user) return errorMessage(409, 'Email already in use');

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(body.password, salt);

  await collection.insertOne({ ...body, password: hash });

  return Response.json({ success: true });
});
