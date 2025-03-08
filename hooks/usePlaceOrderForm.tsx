'use client';
import { Controller, useForm } from 'react-hook-form';
import { Order } from '@/models';
import { PlaceOrderFormInputs } from '@/components/pages';
import { startTransition } from 'react';
import { useResetForm } from './useResetForm';

type UsePlaceOrderFormProps = {
  defaultData: Order | null;
  onSubmitForm: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const usePlaceOrderForm = ({
  defaultData,
  onSubmitForm,
  isPending,
  isSuccess,
  onSuccess,
}: UsePlaceOrderFormProps) => {
  const methods = useForm<PlaceOrderFormInputs>({
    defaultValues: {
      methodDelivery: defaultData
        ? defaultData.methodDelivery ?? 'standard'
        : 'standard',
      methodPayment: defaultData
        ? defaultData.methodPayment ?? 'credit card'
        : 'credit card',
      priceDelivery: defaultData ? defaultData.priceDelivery ?? 3 : 3,
      timeDelivery: defaultData ? defaultData.timeDelivery ?? 3 : 3,
    },
  });

  const onSubmit = (data: PlaceOrderFormInputs) => {
    const formData = new FormData();
    formData.set('methodDelivery', data.methodDelivery);
    formData.set('methodPayment', data.methodPayment);
    formData.set('priceDelivery', data.priceDelivery.toString());
    formData.set('timeDelivery', data.timeDelivery.toString());
    if (defaultData?._id) formData.set('_id', defaultData._id);

    startTransition(() => onSubmitForm(formData));
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
