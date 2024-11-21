'use client';
import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type UseResetFormProps<T extends FieldValues> = {
  isPending: boolean;
  isSuccess: boolean;
  methods: UseFormReturn<T, unknown, undefined>;
  onSuccessAction: () => void;
  defaultValues?: T;
};

export const useResetForm = <T extends FieldValues>({
  isPending,
  isSuccess,
  methods,
  onSuccessAction,
  defaultValues = {} as T,
}: UseResetFormProps<T>) => {
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending && isSuccess) {
      methods.reset(defaultValues);
      onSuccessAction();
    }
  }, [defaultValues, isPending, methods, isSuccess, onSuccessAction]);
};
