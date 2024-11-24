import 'server-only';
import { type NextRequest } from 'next/server';
import { getCollectionDb, connectDB, createTokenForgetPassword } from '@/lib';
import { UserForgetPassword } from '@/models';
import { errorMessage } from '@/helpers';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import juice from 'juice';

export const POST = connectDB(async (request: NextRequest) => {
  const body = (await request.json()) as UserForgetPassword;

  const collection = getCollectionDb<UserForgetPassword>('users');

  if (!collection) return errorMessage(500);

  const user = await collection.findOne({ email: body.email });

  if (!user) return errorMessage(409, 'Incorrect credentials');

  const token = createTokenForgetPassword(user.email);

  const protocol = request.nextUrl.protocol;
  const host = request.nextUrl.host;

  const resetUrl = `${protocol}//${host}/?token=${token}&action_type=reset_password`;

  const templatePath = path.join(process.cwd(), 'templates/forgetPassword.hbs');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  const currentYear = new Date().getFullYear();
  const htmlContent = template({
    currentYear,
    email: body.email,
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
    to: body.email,
    subject: 'Reset password',
    html: htmlWithCss,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch {
    return errorMessage(500, 'Internal server error');
  }
});
