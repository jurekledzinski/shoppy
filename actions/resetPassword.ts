'use server';

import bcrypt from 'bcrypt';
import { errorMessageAction } from '@/helpers';
import { PasswordSchema, UserResetPassword } from '@/models';

import {
  connectDBAction,
  getAuthSecrets,
  getCollectionDb,
  verifyToken,
} from '@/lib';

export const resetPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();

    const body = Object.fromEntries(formData) as UserResetPassword;
    const resetToken = body.token;
    delete body.token;

    const parsedData = PasswordSchema.parse(body);

    if (!resetToken) return errorMessageAction('Unauthorized');

    const decoded = await verifyToken<{ value: string }>(
      resetToken,
      AUTH.SECRET_FORGET_PASSWORD
    );

    const collection = getCollectionDb<UserResetPassword>('users');

    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne<UserResetPassword>({
      email: decoded.payload.value,
    });

    if (!user) return errorMessageAction('Incorrect credentials');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(parsedData.password, salt);

    await collection.updateOne(
      { email: decoded.payload.value },
      { $set: { password: hash } }
    );

    return {
      message: 'Password reset successfully',
      success: true,
    };
  }
);
