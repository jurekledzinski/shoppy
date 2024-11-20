import { AsideState } from '@/store/aside';
import { UseFormReturn } from 'react-hook-form';
import { LoginFormInputs } from '../../forms';
import { State } from '@/helpers';
import { MouseEventHandler } from 'react';

export type LoginPanelProps = {
  context: AsideState;
  isPending: boolean;
  methods: UseFormReturn<LoginFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onRedirectRegister: MouseEventHandler<HTMLButtonElement>;
  onRedirectForgetPassword: MouseEventHandler<HTMLButtonElement>;
  state: State;
};