import 'server-only';
import bcrypt from 'bcrypt';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { ObjectId } from 'mongodb';
import { UserChangePassword, UserRegister } from '@/models';

export const PATCH = connectDBAuth(
  auth(async (request) => {
    const body = (await request.json()) as UserChangePassword;

    if (!request.auth) return errorMessage(401);

    const userId = request.auth.user.id;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessage(500);

    const user = await collection.findOne<UserRegister>({
      _id: new ObjectId(userId),
    });

    if (!user) return errorMessage(409, 'Incorrect credentials');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(body.password, salt);

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: hash } }
    );

    return Response.json({ success: true });
  })
);
