'use server';
import bcrypt from 'bcrypt';
import { connectDBAction, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { UserRegister, UserSchema } from '@/models';

export const register = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = UserSchema.parse(body);

    const collection = getCollectionDb<UserRegister>('users');

    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne<UserRegister>({
      email: parsedData.email,
    });

    if (user) return errorMessageAction('Email already in use');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(parsedData.password, salt);

    await collection.insertOne({ ...parsedData, password: hash });

    return { message: 'Register successful', success: true };
  }
);
