'use client';
import styles from '../Form.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';
import { registser } from '@/actions';
import { useActionState } from 'react';
import { useRegisterForm } from '@/hooks';
import { useAside } from '@/store/aside';

export const RegisterForm = () => {
  const context = useAside();
  const [state, formAction, isPending] = useActionState(registser, {
    message: '',
  });

  const { methods, onSubmit } = useRegisterForm({ formAction, isPending });
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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

      {state?.message && <AlertError>{state.message}</AlertError>}

      <Button
        className={styles.button}
        disabled={isPending}
        type="submit"
        text="Sign Up"
      >
        {isPending && <Loader />}
      </Button>

      <span className={styles.info}>
        Already registered?{' '}
        <button
          className={styles.info}
          onClick={(e) => {
            e.preventDefault();
            const actionElement = context.type;
            const stateOpen = context.value;

            if (actionElement !== 'login' && stateOpen) {
              context.onChange(actionElement, !stateOpen);

              const idTimeout = setTimeout(() => {
                context.onChange('login', true);
                clearTimeout(idTimeout);
              }, 1000);

              return;
            }
          }}
        >
          Sign in here
        </button>
      </span>
    </form>
  );
};
