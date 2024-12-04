'use client';
import styles from '../Form.module.css';
import stylesButton from '@styles/buttons.module.css';
import { UpdateProfileFormProps } from './types';

import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';

export const UpdateProfileForm = ({
  isPending,
  methods,
  onSubmitAction,
  state,
}: UpdateProfileFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmitAction}>
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

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={stylesButton.buttonConfirm}
        disabled={isPending}
        type="submit"
        text="Update profile"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
