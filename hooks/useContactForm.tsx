'use client';
import { startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ContactFormInputs } from '@/components/pages';

type UseContactFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export const useContactForm = ({
  formAction,
  isPending,
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

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending) {
      methods.reset({ email: '', message: '', name: '' });
    }
  }, [isPending, methods]);

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
