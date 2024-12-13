'use server';
import { connectDBAction, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidateTag } from 'next/cache';
import { UpdateUserProfileSchema, UserRegister } from '@/models';

const secret = process.env.AUTH_SECRET;

export const updateUserProfile = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const userHeaders = await headers();
    const body = Object.fromEntries(formData);

    const parsedData = UpdateUserProfileSchema.parse(body);

    const token = await getToken({ req: { headers: userHeaders }, secret });

    if (!token) return errorMessageAction('Unauthorized');

    const userId = token.id as string;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne<UserRegister>({
      _id: new ObjectId(userId),
    });

    if (!user) return errorMessageAction('Incorrect credentials');

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { email: parsedData.email, name: parsedData.name } }
    );

    revalidateTag('get_user');
    return { message: 'Update success', success: true };
  }
);
