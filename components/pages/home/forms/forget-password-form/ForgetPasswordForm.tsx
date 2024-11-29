'use client';
import stylesButton from '@styles/buttons.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';

import { ForgetPasswordFormProps } from './types';

export const ForgetPasswordForm = ({
  isPending,
  methods,
  onSubmitAction,
  state,
}: ForgetPasswordFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmitAction}>
      <FieldInput
        autoComplete="username"
        label="Email"
        placeholder="Email"
        type="email"
        {...methods.register('email', {
          required: { message: 'Email is required', value: true },
          pattern: {
            message: 'Email is invalid',
            value: /\S+@\S+\.\S+/,
          },
        })}
      />

      {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={stylesButton.buttonConfirm}
        disabled={isPending}
        type="submit"
        text="Change password"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
