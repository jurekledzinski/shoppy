'use server';
import { connectDBAction, getCollectionDb, getAuthToken } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidateTag } from 'next/cache';
import { UpdateUserProfileSchema, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

const secret = process.env.AUTH_SECRET;

export const updateUserProfile = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const userHeaders = await headers();
    const body = Object.fromEntries(formData);
    console.log('body profile', body);

    const parsedData = UpdateUserProfileSchema.parse(body);
    console.log('parsedData profile', parsedData);

    const check = await getAuthToken({ headers: userHeaders });
    console.log('check token', check);

    const token = await getToken({
      req: { headers: formatHeaders(userHeaders) },
      secret,
    });
    console.log('parsedData token', token);

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

function formatHeaders(headers?: ReadonlyHeaders) {
  const formattedHeaders: Record<string, string> = {};
  headers?.forEach((value, key) => {
    formattedHeaders[key as keyof typeof formattedHeaders] = value;
  });
  return formattedHeaders;
}
