import { Controller, useForm } from 'react-hook-form';
import { Order } from '@/models';
import { PlaceOrderFormInputs } from '@/components/pages';
import { startTransition } from 'react';
import { useResetForm } from './useResetForm';

type UsePlaceOrderFormProps = {
  defaultData: Order | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const usePlaceOrderForm = ({
  defaultData,
  formAction,
  isPending,
  isSuccess,
  onSuccess,
}: UsePlaceOrderFormProps) => {
  const methods = useForm<PlaceOrderFormInputs>({
    defaultValues: {
      methodDelivery: defaultData
        ? defaultData.methodDelivery ?? 'standard'
        : 'standard',
      methodPayment: defaultData ? defaultData.methodPayment ?? '' : '',
      priceDelivery: defaultData ? defaultData.priceDelivery ?? 3 : 3,
      timeDelivery: defaultData ? defaultData.timeDelivery ?? 3 : 3,
    },
  });

  const onSubmit = (data: PlaceOrderFormInputs) => {
    const formData = new FormData();
    formData.set('_id', defaultData?._id ?? '');
    formData.set('methodDelivery', data.methodDelivery);
    formData.set('methodPayment', data.methodPayment);
    formData.set('priceDelivery', data.priceDelivery.toString());
    formData.set('timeDelivery', data.timeDelivery.toString());

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    onSuccess,
  });

  return {
    Controller,
    methodsPlaceOrder: methods,
    onSubmitPlaceOrder: methods.handleSubmit(onSubmit),
  };
};
