'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseContactFormProps = {
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useContactForm = ({
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
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

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '', message: '', name: '' },
    onSuccess,
  });

  return {
    methodsContact: methods,
    onSubmitContact: methods.handleSubmit(onSubmit),
  };
};
