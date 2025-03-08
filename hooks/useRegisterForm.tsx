'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { RegisterFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseRegisterFormProps = {
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useRegisterForm = ({
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
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

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { email: '', name: '', password: '', confirmPassword: '' },
    onSuccess,
  });

  return {
    methodsRegister: methods,
    onSubmitRegister: methods.handleSubmit(onSubmit),
  };
};
