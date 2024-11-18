'use client';
import { startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '@/components/pages';

type UseRegisterFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export const useRegisterForm = ({
  formAction,
  isPending,
}: UseRegisterFormProps) => {
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

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending) {
      methods.reset({ email: '', name: '', password: '' });
    }
  }, [isPending, methods]);

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
