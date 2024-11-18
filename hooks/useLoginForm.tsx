'use client';
import { startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '@/components/pages';

type UseLoginFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export const useLoginForm = ({ formAction, isPending }: UseLoginFormProps) => {
  const methods = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormInputs) => {
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending) {
      methods.reset({ email: '', password: '' });
    }
  }, [isPending, methods]);

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
