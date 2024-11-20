import { State } from '@/helpers';
import { AsideState } from '@/store/aside';
import { UseFormReturn } from 'react-hook-form';

export type LoginFormInputs = {
  email: string;
  password: string;
};

export type LoginFormProps = {
  context: AsideState;
  methods: UseFormReturn<LoginFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};
