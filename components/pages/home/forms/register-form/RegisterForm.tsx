'use client';
import styles from '../Form.module.css';
import { registser } from '@/actions';
import { toast } from 'react-toastify';
import { useActionState } from 'react';
import { useAside } from '@/store/aside';
import { useRegisterForm, useResetForm } from '@/hooks';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
  QuestionRedirect,
} from '@/components/shared';
import { controlAside } from '@/helpers';

export const RegisterForm = () => {
  const context = useAside();
  const [state, formAction, isPending] = useActionState(registser, {
    message: '',
    success: false,
  });

  const { methods, onSubmit } = useRegisterForm({ formAction });

  useResetForm({
    isPending,
    isSuccess: state.success,
    methods,
    defaultValues: { email: '', name: '', password: '', confirmPassword: '' },
    onSuccess: () => {
      const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
      toast.success('Register successful', { theme });
      const actionElement = context.type;
      context.onChange(actionElement, false);
    },
  });

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

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={styles.button}
        disabled={isPending}
        type="submit"
        text="Sign Up"
      >
        {isPending && <Loader />}
      </Button>

      <QuestionRedirect
        buttonText="Sign in here"
        question=" Already registered?"
        onClick={(e) => {
          e.preventDefault();
          const actionElement = context.type;
          const stateOpen = context.value;
          controlAside(context, 'login', actionElement, stateOpen);
        }}
      />
    </form>
  );
};
