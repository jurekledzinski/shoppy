'use client';
import { startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ForgetPasswordInputs } from '@/components/pages';

type UseForgetPasswordFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
};

export const useForgetPasswordForm = ({
  formAction,
  isPending,
}: UseForgetPasswordFormProps) => {
  const methods = useForm<ForgetPasswordInputs>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgetPasswordInputs) => {
    const formData = new FormData();
    formData.set('email', data.email);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending) {
      methods.reset({ email: '' });
    }
  }, [isPending, methods]);

  return {
    methods,
    onSubmit: methods.handleSubmit(onSubmit),
  };
};
