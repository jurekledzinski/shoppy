import 'server-only';
import { errorMessage } from '@/helpers';
import { UserLogin, UserRegister } from '@/models';
import { type NextRequest } from 'next/server';
import {
  getCollectionDb,
  connectDB,
  comparePasswords,
  createToken,
} from '@/lib';

export const POST = connectDB(async (request: NextRequest) => {
  const body = (await request.json()) as UserLogin;

  const collection = getCollectionDb<UserRegister>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne({ email: body.email });

  if (!user) return errorMessage(409, 'Incorrect credentials');

  const isMatch = comparePasswords(body.password, user.password);

  if (!isMatch) return errorMessage(409, 'Incorrect credentials');

  const token = createToken(user._id);

  return Response.json({
    success: true,
    payload: { email: user.email, id: user._id, name: user.name, auth: token },
  });
});
