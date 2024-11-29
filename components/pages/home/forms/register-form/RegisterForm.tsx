'use client';
import stylesButton from '@styles/buttons.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';
import { RegisterFormProps } from './types';

export const RegisterForm = ({
  isPending,
  methods,
  onSubmitAction,
  state,
}: RegisterFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmitAction}>
      <FieldInput
        autoComplete="username"
        label="Name"
        placeholder="Name"
        type="text"
        {...methods.register('name', {
          required: { message: 'Name is required', value: true },
        })}
      />

      {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

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

      <FieldInput
        autoComplete="current-password"
        label="Confirm password"
        placeholder="Confirm password"
        type="password"
        {...methods.register('confirmPassword', {
          required: { message: 'Confirm password is required', value: true },
        })}
      />

      {errors.confirmPassword && (
        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
      )}

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={stylesButton.buttonConfirm}
        disabled={isPending}
        type="submit"
        text="Sign Up"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
