import { useEffect } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type UseResetFormProps<T extends FieldValues> = {
  isPending: boolean;
  isSuccess: boolean;
  methods: UseFormReturn<T, unknown, undefined>;
  onSuccess: () => void;
  defaultValues?: T;
};

export const useResetForm = <T extends FieldValues>({
  isPending,
  isSuccess,
  methods,
  onSuccess,
  defaultValues = {} as T,
}: UseResetFormProps<T>) => {
  useEffect(() => {
    if (methods.formState.isSubmitSuccessful && !isPending && isSuccess) {
      if (Object.keys(defaultValues).length) methods.reset(defaultValues);
      onSuccess();
    }
  }, [defaultValues, isPending, methods, isSuccess, onSuccess]);
};
