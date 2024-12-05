import { UseFormReturn } from 'react-hook-form';
import { ForgetPasswordInputs } from '../../forms';
import { State } from '@/helpers';

export type ForgetPasswordPanelProps = {
  isPending: boolean;
  methods: UseFormReturn<ForgetPasswordInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
};
