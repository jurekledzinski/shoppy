'use client';
import { LoginFormInputs } from '@/components/pages';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';

type UseLoginFormProps = {
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
  optionCheckout?: string | null;
};

export const useLoginForm = ({
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
  optionCheckout,
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
    if (optionCheckout) formData.set('params', optionCheckout);

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '', password: '' },
    onSuccess,
  });

  return {
    methodsLogin: methods,
    onSubmitLogin: methods.handleSubmit(onSubmit),
  };
};
