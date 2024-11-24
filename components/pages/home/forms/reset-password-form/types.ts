import { State } from '@/helpers';
import { MouseEventHandler } from 'react';
import { UseFormReturn } from 'react-hook-form';

export type ResetPasswordFormInputs = {
  password: string;
  confirmPassword?: string;
};

export type ResetPasswordFormProps = {
  methods: UseFormReturn<ResetPasswordFormInputs, unknown, undefined>;
  onCancelAction: MouseEventHandler<HTMLButtonElement>;
  onSubmitAction: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
};