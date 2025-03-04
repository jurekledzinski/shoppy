'use server';
import bcrypt from 'bcrypt';
import { connectDBAction, getCollectionDb, getSessionData } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { ObjectId } from 'mongodb';
import { PasswordSchema, UserRegister } from '@/models';

export const changeUserPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const { token } = await getSessionData();

    const body = Object.fromEntries(formData);
    const parsedData = PasswordSchema.parse(body);

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
