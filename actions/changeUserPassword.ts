'use server';
import bcrypt from 'bcrypt';
import { connectDBAction, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { PasswordSchema, UserRegister } from '@/models';

const secret = process.env.AUTH_SECRET;

export const changeUserPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const userHeaders = await headers();
    const body = Object.fromEntries(formData);

    const parsedData = PasswordSchema.parse(body);

    const token = await getToken({ req: { headers: userHeaders }, secret });

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
