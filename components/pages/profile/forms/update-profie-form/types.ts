import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type UpdateProfileFormInputs = {
  name: string;
  email: string;
};

export type UpdateProfileFormProps = {
  methods: UseFormReturn<UpdateProfileFormInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
