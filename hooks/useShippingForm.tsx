import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ShippingFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';
import { Order } from '@/models';

type useShippingFormProps = {
  defaultData: Order | null;
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
  userId?: string;
  guestId?: string | null;
};

export const useShippingForm = ({
  defaultData,
  formAction,
  isPending,
  isSuccess,
  onSuccess,
  userId,
  guestId,
}: useShippingFormProps) => {
  const methods = useForm<ShippingFormInputs>({
    defaultValues: {
      name: defaultData ? defaultData.name : '',
      surname: defaultData ? defaultData.surname : '',
      city: defaultData ? defaultData.city : '',
      country: defaultData ? defaultData.country : '',
      postCode: defaultData ? defaultData.postCode : '',
      street: defaultData ? defaultData.street : '',
    },
  });

  const onSubmit = (data: ShippingFormInputs) => {
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('surname', data.surname);
    formData.set('street', data.street);
    formData.set('postCode', data.postCode);
    formData.set('city', data.city);
    formData.set('country', data.country);
    formData.set('createdAt', new Date().toISOString());
    if (userId) formData.set('userId', userId);
    if (guestId) formData.set('guestId', guestId);

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
    methodsShipping: methods,
    onSubmitShipping: methods.handleSubmit(onSubmit),
  };
};
