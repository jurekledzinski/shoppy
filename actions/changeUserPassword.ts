'use server';
import bcrypt from 'bcrypt';
import { connectDBAction, getAuthToken, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { PasswordSchema, UserRegister } from '@/models';

export const changeUserPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const headersData = await headers();
    const body = Object.fromEntries(formData);

    const parsedData = PasswordSchema.parse(body);

    const token = await getAuthToken({ headers: headersData });

    if (!token) return errorMessageAction('Unauthorized');

    const userId = token.id as string;

    const collection = getCollectionDb<Omit<UserRegister, '_id'>>('users');

    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne<UserRegister>({
      _id: new ObjectId(userId),
    });

    if (!user) return errorMessageAction('Incorrect credentials');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(parsedData.password, salt);

    await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { password: hash } }
    );

    return { message: 'Password change successful', success: true };
  }
);
