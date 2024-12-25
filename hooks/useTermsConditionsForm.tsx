import { Order } from '@/models';
import { startTransition } from 'react';
import { TermsConditionsFormInputs } from '@/components/pages';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';

type useTermsConditionsFormProps = {
  defaultData: Order | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useTermsConditionsForm = ({
  defaultData,
  formAction,
  isPending,
  isSuccess,
  onSuccess,
}: useTermsConditionsFormProps) => {
  const methods = useForm<TermsConditionsFormInputs>({
    defaultValues: {
      termsConditions: false,
    },
  });

  const onSubmit = (data: TermsConditionsFormInputs) => {
    const formData = new FormData();
    formData.set('_id', defaultData?._id ?? '');
    formData.set('termsConditions', data.termsConditions.toString());

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    onSuccess,
    defaultValues: { termsConditions: false },
  });

  return {
    methodsCheckoutOrder: methods,
    onSubmitCheckoutOrder: methods.handleSubmit(onSubmit),
  };
};
