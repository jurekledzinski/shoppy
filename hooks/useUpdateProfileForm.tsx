'use client';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';
import { UpdateProfileFormInputs } from '@/components/pages';
import { UserRegister } from '@/models';

type UseUpdateProfileFormProps = {
  defaults: Omit<UserRegister, 'password' | '_id'> | null;
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useUpdateProfileForm = ({
  defaults,
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
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

    startTransition(() => onSubmitForm(formData));
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    onSuccess,
  });

  return {
    methodsUpdateProfile: methods,
    onSubmitUpdateProfile: methods.handleSubmit(onSubmit),
  };
};
