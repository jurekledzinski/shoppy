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
import { useAside } from '@/store/aside';

export const LoginForm = () => {
  const context = useAside();
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
        text="Sign In"
      >
        {isPending && <Loader />}
      </Button>

      <span className={styles.info}>
        Not registered?{' '}
        <button
          className={styles.info}
          onClick={(e) => {
            e.preventDefault();
            const actionElement = context.type;
            const stateOpen = context.value;

            if (actionElement !== 'register' && stateOpen) {
              context.onChange(actionElement, !stateOpen);

              const idTimeout = setTimeout(() => {
                context.onChange('register', true);
                clearTimeout(idTimeout);
              }, 1000);

              return;
            }
          }}
        >
          Sign up here
        </button>
      </span>
      <span className={styles.info}>
        Forget password?{' '}
        <button
          className={styles.info}
          onClick={(e) => {
            e.preventDefault();
            const actionElement = context.type;
            const stateOpen = context.value;

            if (actionElement !== 'forget-password' && stateOpen) {
              context.onChange(actionElement, !stateOpen);

              const idTimeout = setTimeout(() => {
                context.onChange('forget-password', true);
                clearTimeout(idTimeout);
              }, 1000);

              return;
            }
          }}
        >
          Click here
        </button>
      </span>
    </form>
  );
};
