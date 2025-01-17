'use server';
import { connectDBAction, getAuthToken, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidateTag } from 'next/cache';
import { UserRegister } from '@/models';

export const deleteUserAccount = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const headersData = await headers();
    Object.fromEntries(formData);

    const token = await getAuthToken({ headers: headersData });

    if (!token) return errorMessageAction('Unauthorized');

    const userId = token.id as string;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessageAction('Internal server error');

    await collection.deleteOne({
      _id: new ObjectId(userId),
    });

    revalidateTag('get_user');
    return { message: 'Delete user successful', success: true };
  }
);
