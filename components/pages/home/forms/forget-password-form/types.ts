import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type ForgetPasswordInputs = {
  email: string;
};

export type ForgetPasswordFormProps = {
  isPending: boolean;
  methods: UseFormReturn<ForgetPasswordInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
};
