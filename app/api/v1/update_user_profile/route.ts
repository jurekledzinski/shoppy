import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { ObjectId } from 'mongodb';
import { UserRegister, UserUpdateProfile } from '@/models';

export const PATCH = connectDBAuth(
  auth(async (request) => {
    const body = (await request.json()) as UserUpdateProfile;

    if (!request.auth) return errorMessage(401);

    const userId = request.auth.user.id;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessage(500);

    const user = await collection.findOne<UserRegister>({
      _id: new ObjectId(userId),
    });

    if (!user) return errorMessage(409, 'Incorrect credentials');

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { email: body.email, name: body.name } }
    );

    return Response.json({ success: true });
  })
);
