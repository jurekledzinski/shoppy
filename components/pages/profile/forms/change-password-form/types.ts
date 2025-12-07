import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type ChangePasswordFormInputs = {
  password: string;
  confirmPassword?: string;
};

export type ChangePasswordFormProps = {
  methods: UseFormReturn<ChangePasswordFormInputs, unknown, ChangePasswordFormInputs>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
