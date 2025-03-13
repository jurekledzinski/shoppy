import styles from '../Form.module.css';
import { Alert, Button, ErrorMessage, FieldInput } from '@/components/shared';
import { ChangePasswordFormProps } from './types';
import { patternPassword, validateConfirmPassword } from '@/helpers';

export const ChangePasswordForm = ({
  isPending,
  methods,
  onSubmit,
  state,
}: ChangePasswordFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        type="text"
        name="username"
        autoComplete="username"
        style={{ display: 'none' }}
      />
      <FieldInput
        autoComplete="new-password"
        label="Password"
        placeholder="Password"
        type="password"
        {...methods.register('password', {
          required: { message: 'Password is required', value: true },
          pattern: patternPassword(),
        })}
      />

      {errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}

      <FieldInput
        autoComplete="new-password"
        label="Confirm password"
        placeholder="Confirm password"
        type="password"
        {...methods.register('confirmPassword', {
          required: { message: 'Confirm password is required', value: true },
          validate: validateConfirmPassword,
        })}
      />

      {errors.confirmPassword && (
        <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
      )}

      {!state.success && state.message && (
        <Alert marginTop={8} color="negative">
          {state.message}
        </Alert>
      )}

      <Button
        disabled={isPending}
        isLoading={isPending}
        type="submit"
        label="Change password"
        radius={2}
      />
    </form>
  );
};
