import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ResetPasswordFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';
import { useSearchParams } from 'next/navigation';

type UseResetPasswordProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useResetPasswordForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccess,
}: UseResetPasswordProps) => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const methods = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormInputs) => {
    const formData = new FormData();
    formData.set('password', data.password);
    formData.set('token', token ?? '');

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { password: '', confirmPassword: '' },
    onSuccess,
  });

  return {
    methodsResetPassword: methods,
    onSubmitResetPassword: methods.handleSubmit(onSubmit),
  };
};
