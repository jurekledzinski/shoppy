'use client';
import styles from '../Form.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';
import { forgetPassword } from '@/actions';
import { useActionState } from 'react';
import { useForgetPasswordForm } from '@/hooks';

export const ForgetPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(forgetPassword, {
    message: '',
  });

  const { methods, onSubmit } = useForgetPasswordForm({
    formAction,
    isPending,
  });
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
