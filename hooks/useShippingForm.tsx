import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ShippingFormInputs } from '@/components/pages';
import { useResetForm } from './useResetForm';

type useShippingFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccess: () => void;
};

export const useShippingForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccess,
}: useShippingFormProps) => {
  const methods = useForm<ShippingFormInputs>({
    defaultValues: {
      name: '',
      surname: '',
      city: '',
      country: '',
      postCode: '',
      street: '',
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

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: {
      city: '',
      country: '',
      name: '',
      postCode: '',
      street: '',
      surname: '',
    },
    onSuccess,
  });

  return {
    methodsShipping: methods,
    onSubmitShipping: methods.handleSubmit(onSubmit),
  };
};
