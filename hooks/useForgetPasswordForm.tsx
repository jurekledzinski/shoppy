import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ForgetPasswordInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type UseForgetPasswordFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useForgetPasswordForm = ({
  formAction,
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

    startTransition(() => {
      formAction(formData);
    });
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
