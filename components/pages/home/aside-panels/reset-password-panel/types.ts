import { UseFormReturn } from 'react-hook-form';
import { ResetPasswordFormInputs } from '../../forms';
import { State } from '@/helpers';
import { MouseEventHandler } from 'react';

export type ResetPasswordPanelProps = {
  isPending: boolean;
  methods: UseFormReturn<ResetPasswordFormInputs, unknown, undefined>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
};
