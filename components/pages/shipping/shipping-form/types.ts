import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type ShippingFormInputs = {
  name: string;
  surname: string;
  street: string;
  postCode: string;
  city: string;
  country: string;
};

export type ShippingFormProps = {
  methods: UseFormReturn<ShippingFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
