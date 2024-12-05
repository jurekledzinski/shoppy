import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';

export type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterFormProps = {
  methods: UseFormReturn<RegisterFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
