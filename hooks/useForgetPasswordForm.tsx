'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ForgetPasswordInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseForgetPasswordFormProps = {
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useForgetPasswordForm = ({
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
}: UseForgetPasswordFormProps) => {
  const methods = useForm<ForgetPasswordInputs>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgetPasswordInputs) => {
    const formData = new FormData();
    formData.set('email', data.email);

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '' },
    onSuccess,
  });

  return {
    methodsForgetPassword: methods,
    onSubmitForgetPassword: methods.handleSubmit(onSubmit),
  };
};
