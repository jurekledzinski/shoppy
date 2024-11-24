'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseContactFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccessAction: () => void;
};

export const useContactForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccessAction,
}: UseContactFormProps) => {
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

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '', message: '', name: '' },
    onSuccessAction,
  });

  return {
    methodsContact: methods,
    onSubmitContact: methods.handleSubmit(onSubmit),
  };
};
