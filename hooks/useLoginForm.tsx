'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseLoginFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccessAction: () => void;
};

export const useLoginForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccessAction,
}: UseLoginFormProps) => {
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

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '', password: '' },
    onSuccessAction,
  });

  return {
    methodsLogin: methods,
    onSubmitLogin: methods.handleSubmit(onSubmit),
  };
};
