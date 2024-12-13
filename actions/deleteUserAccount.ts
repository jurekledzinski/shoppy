'use server';
import { connectDBAction, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidateTag } from 'next/cache';
import { UserRegister } from '@/models';

const secret = process.env.AUTH_SECRET;

export const deleteUserAccount = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const userHeaders = await headers();
    Object.fromEntries(formData);

    const token = await getToken({ req: { headers: userHeaders }, secret });

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
