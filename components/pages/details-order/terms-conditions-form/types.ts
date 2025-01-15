import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type TermsConditionsFormInputs = {
  termsConditions: boolean;
};

export type TermsConditionsFormProps = {
  isEmpty: boolean;
  isPending: boolean;
  methods: UseFormReturn<TermsConditionsFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  textSubmit: string;
};
