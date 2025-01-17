'use server';
import contactEmailTemplate from '../templates/contactEmail.hbs';
import fs from 'fs';
import juice from 'juice';
import nodemailer from 'nodemailer';
import path from 'path';
import { actionTryCatch } from '@/helpers';
import { ContactEmailSchema } from '@/models';

export const contact = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const body = Object.fromEntries(formData);

    const parsedData = ContactEmailSchema.parse(body);

    const currentYear = new Date().getFullYear();
    const date = new Date().toLocaleString();
    const htmlContent = contactEmailTemplate({
      name: parsedData.name,
      email: parsedData.email,
      message: parsedData.message,
      currentYear,
      date,
    });

    const cssPath = path.join(process.cwd(), 'templates/contactEmail.css');

    console.log('Resolved CSS path:', cssPath);
    console.log('Current working directory:', process.cwd());

    try {
      fs.readFileSync(cssPath, 'utf-8');
      console.log('CSS file loaded successfully.');
    } catch (error) {
      console.error('Error reading CSS file:', error);
    }
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

    await transporter.sendMail(mailOptions);

    return { message: 'Message send successfully', success: true };
  }
);
