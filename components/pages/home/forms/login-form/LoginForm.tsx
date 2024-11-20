'use client';
import styles from '../Form.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
  QuestionRedirect,
} from '@/components/shared';
import { login } from '@/actions';
import { useActionState } from 'react';
import { useLoginForm, useResetForm } from '@/hooks';
import { useAside } from '@/store/aside';
import { toast } from 'react-toastify';
import { controlAside } from '@/helpers';

export const LoginForm = () => {
  const context = useAside();
  const [state, formAction, isPending] = useActionState(login, {
    message: '',
    success: false,
  });

  const { methods, onSubmit } = useLoginForm({ formAction });
  const { formState } = methods;
  const { errors } = formState;

  useResetForm({
    isPending,
    isSuccess: state.success,
    methods,
    defaultValues: { email: '', password: '' },
    onSuccess: () => {
      const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
      toast.success('Login successful', { theme });
      const actionElement = context.type;
      context.onChange(actionElement, false);
    },
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={styles.button}
        disabled={isPending}
        type="submit"
        text="Sign In"
      >
        {isPending && <Loader />}
      </Button>

      <QuestionRedirect
        buttonText="Sign up here"
        question="Not registered?"
        onClick={(e) => {
          e.preventDefault();
          const actionElement = context.type;
          const stateOpen = context.value;
          controlAside(context, 'register', actionElement, stateOpen);
        }}
      />

      <QuestionRedirect
        buttonText="Click here"
        question="Forget password?"
        onClick={(e) => {
          e.preventDefault();
          const actionElement = context.type;
          const stateOpen = context.value;
          controlAside(context, 'forget-password', actionElement, stateOpen);
        }}
      />
    </form>
  );
};
