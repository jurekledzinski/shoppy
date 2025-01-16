import { Cart, Order } from '@/models';
import { startTransition } from 'react';
import { TermsConditionsFormInputs } from '@/components/pages';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';

type useTermsConditionsFormProps = {
  cartData: Cart | null;
  defaultData: Order | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useTermsConditionsForm = ({
  cartData,
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
    formData.set('termsConditions', data.termsConditions.toString());
    formData.set('methodDelivery', defaultData?.methodDelivery ?? 'standard');
    formData.set('priceDelivery', defaultData?.priceDelivery.toString() ?? '3');
    formData.set('timeDelivery', defaultData?.timeDelivery.toString() ?? '3');
    if (cartData) formData.set('products', JSON.stringify(cartData.products));
    if (defaultData?._id) formData.set('_id', defaultData._id);

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
