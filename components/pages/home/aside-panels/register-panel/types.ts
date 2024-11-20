import { AsideState } from '@/store/aside';
import { UseFormReturn } from 'react-hook-form';
import { RegisterFormInputs } from '../../forms';
import { MouseEventHandler } from 'react';
import { State } from '@/helpers';

export type RegisterPanelProps = {
  context: AsideState;
  isPending: boolean;
  methods: UseFormReturn<RegisterFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onRedirectLogin: MouseEventHandler<HTMLButtonElement>;
  state: State;
};
