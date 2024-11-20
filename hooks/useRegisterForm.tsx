'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '@/components/pages';

type UseRegisterFormProps = {
  formAction: (payload: FormData) => void;
};

export const useRegisterForm = ({ formAction }: UseRegisterFormProps) => {
  const methods = useForm<RegisterFormInputs>({
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: '',
    },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('name', data.name);
    formData.set('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
