'use server';
import {
  connectDBAction,
  createTokenForgetPassword,
  getCollectionDb,
} from '@/lib';
import { errorMessageAction } from '@/helpers';
import { ForgetPasswordSchema, UserForgetPassword } from '@/models';
import { getDomain } from '@/app/_helpers';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
// import Handlebars from 'handlebars';
import juice from 'juice';
import forgetPasswordTemplate from '../templates/forgetPassword.hbs';

export const forgetPassword = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = ForgetPasswordSchema.parse(body);

    // ----

    const collection = getCollectionDb<UserForgetPassword>('users');

    if (!collection) return errorMessageAction('Internal server error');

    const user = await collection.findOne({ email: parsedData.email });

    if (!user) return errorMessageAction('Incorrect credentials');

    const token = createTokenForgetPassword(user.email);

    const domain = await getDomain();

    const resetUrl = `${domain}/?token=${token}&action_type=reset_password`;

    // const templatePath = path.join(
    //   process.cwd(),
    //   'templates/forgetPassword.hbs'
    // );
    // const templateContent = fs.readFileSync(templatePath, 'utf-8');
    // const template = Handlebars.compile(templateContent);
    const currentYear = new Date().getFullYear();
    const htmlContent = forgetPasswordTemplate({
      currentYear,
      email: parsedData.email,
      resetUrl,
    });

    const cssPath = path.join(process.cwd(), 'templates/forgetPassword.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    const htmlWithCss = juice.inlineContent(htmlContent, cssContent);

    const transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      port: process.env.PORT_PROVIDER_EMAIL,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.PASSWORD_USER,
      },
      tls: {
        rejectUnauthorized: false,
      },
    } as nodemailer.TransportOptions);

    const mailOptions = {
      from: `Shoopy shop <${process.env.EMAIL_USER}>`,
      to: parsedData.email,
      subject: 'Reset password',
      html: htmlWithCss,
    };

    await transporter.sendMail(mailOptions);

    // ----

    return {
      message: 'Request send successfully, please check your email',
      success: true,
    };
  }
);
