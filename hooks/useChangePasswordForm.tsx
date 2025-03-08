'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ChangePasswordFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseChangePasswordFormProps = {
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useChangePasswordForm = ({
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
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

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { password: '', confirmPassword: '' },
    onSuccess,
  });

  return {
    methodsChangePassword: methods,
    onSubmitChangePassword: methods.handleSubmit(onSubmit),
  };
};
