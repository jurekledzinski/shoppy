import styles from '../Form.module.css';
import { Alert, Button, ErrorMessage, FieldInput } from '@/components/shared';
import { UpdateProfileFormProps } from './types';

export const UpdateProfileForm = ({
  isPending,
  methods,
  onSubmit,
  state,
}: UpdateProfileFormProps) => {
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

      {!state.success && state.message && (
        <Alert marginTop={8} color="negative">
          {state.message}
        </Alert>
      )}

      <Button
        disabled={isPending}
        isLoading={isPending}
        type="submit"
        label="Update profile"
        radius={2}
      />
    </form>
  );
};
