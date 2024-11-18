'use client';
import styles from '../Form.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';
import { login } from '@/actions';
import { useActionState } from 'react';
import { useLoginForm } from '@/hooks';

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, {
    message: '',
  });

  const { methods, onSubmit } = useLoginForm({ formAction, isPending });
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FieldInput
        autoComplete="username"
        label="Email"
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
        type="password"
        {...methods.register('password', {
          required: { message: 'Password is required', value: true },
        })}
      />

      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      {state?.message && <AlertError>{state.message}</AlertError>}

      <Button
        className={styles.button}
        disabled={isPending}
        type="submit"
        text="Submit"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
