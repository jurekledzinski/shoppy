'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ChangePasswordFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseChangePasswordFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccessAction: () => void;
};

export const useChangePasswordForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccessAction,
}: UseChangePasswordFormProps) => {
  const methods = useForm<ChangePasswordFormInputs>({
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  });

  const onSubmit = (data: ChangePasswordFormInputs) => {
    const formData = new FormData();
    formData.set('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { password: '', confirmPassword: '' },
    onSuccessAction,
  });

  return {
    methodsChangePassword: methods,
    onSubmitChangePassword: methods.handleSubmit(onSubmit),
  };
};
