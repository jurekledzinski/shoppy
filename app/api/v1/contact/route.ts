import 'server-only';

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import juice from 'juice';
import { type NextRequest } from 'next/server';
import { ContactEmail } from '@/models';
import { errorMessage } from '@/helpers';

export const POST = async (request: NextRequest) => {
  const data = (await request.json()) as ContactEmail;

  const templatePath = path.join(process.cwd(), 'templates/contactEmail.hbs');
  const templateContent = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateContent);
  const currentYear = new Date().getFullYear();
  const date = new Date().toLocaleString();
  const htmlContent = template({
    name: data.name,
    email: data.email,
    message: data.message,
    currentYear,
    date,
  });

  const cssPath = path.join(process.cwd(), 'templates/contactEmail.css');
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
    to: process.env.EMAIL_SENDTO,
    subject: 'Contact email',
    html: htmlWithCss,
  };

  try {
    await transporter.sendMail(mailOptions);
    return Response.json({ success: true });
  } catch {
    return errorMessage(500, 'Internal server error');
  }
};
