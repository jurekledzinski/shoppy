'use server';

import contactEmailTemplate from '../templates/contactEmail.hbs';
import { actionTryCatch } from '@/helpers';
import { ContactEmailSchema } from '@/models';

import { mergeTemplate, nodemailerTransporter, setMailOptions } from '@/lib';

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

    const htmlWithCss = await mergeTemplate(
      'templates/contactEmail.css',
      htmlContent
    );

    const transporter = await nodemailerTransporter();

    const mailOptions = await setMailOptions(
      'Shoopy shop',
      'Contact email',
      htmlWithCss
    );

    await transporter.sendMail(mailOptions);

    return { message: 'Message send successfully', success: true };
  }
);
