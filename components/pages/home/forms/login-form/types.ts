import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  methods: UseFormReturn<LoginFormInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
