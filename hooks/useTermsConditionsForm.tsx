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
    formData.set('_id', defaultData?._id ?? '');
    formData.set('termsConditions', data.termsConditions.toString());
    if (cartData) {
      formData.set('cartId', cartData._id ?? '');
      formData.set('products', JSON.stringify(cartData.products));
      formData.set('totalAmountCart', cartData.totalAmountCart.toString());
      formData.set('totalPriceCart', cartData.totalPriceCart.toString());
    }

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
