'use server';
import forgetPasswordTemplate from '../templates/forgetPassword.hbs';
import { errorMessageAction, getDomain } from '@/helpers';
import { ForgetPasswordSchema, UserForgetPassword } from '@/models';

import {
  connectDBAction,
  createToken,
  getAuthSecrets,
  getCollectionDb,
  mergeTemplate,
  nodemailerTransporter,
  setMailOptions,
} from '@/lib';

export const forgetPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const domain = await getDomain();
    const body = Object.fromEntries(formData);

    const parsedData = ForgetPasswordSchema.parse(body);

    const collection = getCollectionDb<UserForgetPassword>('users');
    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne({ email: parsedData.email });
    if (!user) return errorMessageAction('Incorrect credentials');

    const token = await createToken(
      user.email,
      AUTH.SECRET_FORGET_PASSWORD,
      AUTH.LIFETIME_ACCESS_TOKEN
    );

    const resetUrl = `${domain}/?token=${token}&action_type=reset_password`;

    const currentYear = new Date().getFullYear();
    const htmlContent = forgetPasswordTemplate({
      currentYear,
      email: parsedData.email,
      resetUrl,
    });

    const htmlWithCss = await mergeTemplate(
      'templates/forgetPassword.css',
      htmlContent
    );

    const transporter = await nodemailerTransporter();

    const mailOptions = await setMailOptions(
      'Shoopy shop',
      'Reset password',
      htmlWithCss
    );

    await transporter.sendMail(mailOptions);

    return {
      message: 'Request send successfully, please check your email',
      success: true,
    };
  }
);
