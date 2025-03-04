'use server';

import fs from 'fs';
import juice from 'juice';
import nodemailer from 'nodemailer';
import path from 'path';

const HOST_EMAIL = process.env.HOST_EMAIL;
const PORT_PROVIDER_EMAIL = process.env.PORT_PROVIDER_EMAIL;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_SEND_TO = process.env.EMAIL_SENDTO;
const PASSWORD_USER = process.env.PASSWORD_USER;

export const mergeTemplate = async (pathname: string, htmlContent: string) => {
  const cssPath = path.join(process.cwd(), pathname);

  const cssContent = fs.readFileSync(cssPath, 'utf-8');

  const htmlWithCss = juice.inlineContent(htmlContent, cssContent);

  return htmlWithCss;
};

export const nodemailerTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: HOST_EMAIL,
    port: PORT_PROVIDER_EMAIL,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: PASSWORD_USER,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as nodemailer.TransportOptions);

  return transporter;
};

export const setMailOptions = async (
  from: string,
  subject: string,
  htmlWithCss: string
) => ({
  from: `${from} <${EMAIL_USER}>`,
  to: EMAIL_SEND_TO,
  subject,
  html: htmlWithCss,
});
