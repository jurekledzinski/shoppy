import { State } from '@/helpers';
import { AsideState } from '@/store/aside';
import { UseFormReturn } from 'react-hook-form';

export type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterFormProps = {
  context: AsideState;
  methods: UseFormReturn<RegisterFormInputs, unknown, undefined>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
