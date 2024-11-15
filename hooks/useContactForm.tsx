'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormInputs } from '@/components/pages';

type UseContactFormProps = {
  formAction: (payload: FormData) => void;
};

export const useContactForm = ({ formAction }: UseContactFormProps) => {
  const methods = useForm<ContactFormInputs>({
    defaultValues: {
      email: '',
      message: '',
      name: '',
    },
  });

  const onSubmit = (data: ContactFormInputs) => {
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('email', data.email);
    formData.set('message', data.message);

    startTransition(() => {
      formAction(formData);
    });
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
