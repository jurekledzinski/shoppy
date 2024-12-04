import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type ReviewFormInputs = {
  review: string;
  rate: number;
};

export type ReviewFormProps = {
  methods: UseFormReturn<ReviewFormInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
