import stylesButton from '@styles/buttons.module.css';
import {
  Alert,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';

import { LoginFormProps } from './types';

export const LoginForm = ({
  methods,
  onSubmit,
  state,
  isPending,
}: LoginFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmit}>
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

      <FieldInput
        autoComplete="current-password"
        label="Password"
        placeholder="Password"
        type="password"
        {...methods.register('password', {
          required: { message: 'Password is required', value: true },
        })}
      />

      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      {!state.success && state.message && <Alert>{state.message}</Alert>}

      <Button
        className={stylesButton.buttonConfirmFullWidth}
        disabled={isPending}
        type="submit"
        text="Sign In"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
