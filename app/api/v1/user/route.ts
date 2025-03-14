import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { ObjectId } from 'mongodb';
import { UserRegister } from '@/models';

export const GET = connectDBAuth(
  auth(async (request) => {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!request.auth || !userId) return errorMessage(401);

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessage(500);

    const user = await collection.findOne<UserRegister>(
      {
        _id: new ObjectId(userId),
      },
      { projection: { password: false } }
    );

    if (!user) return errorMessage(409, 'Incorrect credentials');

    return Response.json({ success: true, payload: user });
  })
);
