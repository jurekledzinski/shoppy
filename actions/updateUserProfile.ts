'use server';
import { connectDBAction, getAuthToken, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidateTag } from 'next/cache';
import { UpdateUserProfileSchema, UserRegister } from '@/models';

export const updateUserProfile = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const headersData = await headers();
    const token = await getAuthToken({ headers: headersData });

    const body = Object.fromEntries(formData);

    const parsedData = UpdateUserProfileSchema.parse(body);

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
