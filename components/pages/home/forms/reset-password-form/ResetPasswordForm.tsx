import { Alert, Button, ErrorMessage, FieldInput } from '@/components/shared';
import { patternPassword, validateConfirmPassword } from '@/helpers';
import { ResetPasswordFormProps } from './types';

export const ResetPasswordForm = ({
  methods,
  onCancel,
  onSubmit,
  state,
  isPending,
}: ResetPasswordFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmit}>
      <FieldInput
        autoComplete="current-password"
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
        autoComplete="current-password"
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
        fullWidth={true}
        isLoading={isPending}
        type="submit"
        label="Change password"
        radius={2}
      />
      <Button
        disabled={isPending}
        fullWidth={true}
        label="Cancel"
        onClick={onCancel}
        radius={2}
      />
    </form>
  );
};
