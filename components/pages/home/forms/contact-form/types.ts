import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormProps = {
  methods: UseFormReturn<ContactFormInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
