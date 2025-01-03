'use server';
import bcrypt from 'bcrypt';
import { connectDBAction, getCollectionDb, verifyToken } from '@/lib';
import { errorMessageAction } from '@/helpers';

import { PasswordSchema, UserResetPassword } from '@/models';

const secret = process.env.JWT_SECRET_FORGET_PASSWORD!;

export const resetPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData) as UserResetPassword;
    const resetToken = body.token;
    delete body.token;

    const parsedData = PasswordSchema.parse(body);

    if (!resetToken) return errorMessageAction('Unauthorized');

    const decoded = await verifyToken<{ value: string }>(resetToken, secret);

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
