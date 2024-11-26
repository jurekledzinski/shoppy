'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';
import { UpdateProfileFormInputs } from '@/components/pages';
import { UserRegister } from '@/models';

type UseUpdateProfileFormProps = {
  defaults: Omit<UserRegister, 'password' | '_id'> | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccessAction: () => void;
};

export const useUpdateProfileForm = ({
  defaults,
  formAction,
  isPending,
  isSuccess,
  onSuccessAction,
}: UseUpdateProfileFormProps) => {
  const methods = useForm<UpdateProfileFormInputs>({
    defaultValues: {
      email: defaults ? defaults.email : '',
      name: defaults ? defaults.name : '',
    },
  });

  const onSubmit = (data: UpdateProfileFormInputs) => {
    const formData = new FormData();
    formData.set('email', data.email);
    formData.set('name', data.name);

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    onSuccessAction,
  });

  return {
    methodsUpdateProfile: methods,
    onSubmitUpdateProfile: methods.handleSubmit(onSubmit),
  };
};
