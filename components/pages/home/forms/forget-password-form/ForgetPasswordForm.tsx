import { Alert, Button, ErrorMessage, FieldInput } from '@/components/shared';
import { ForgetPasswordFormProps } from './types';

export const ForgetPasswordForm = ({
  isPending,
  methods,
  onSubmit,
  state,
}: ForgetPasswordFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmit}>
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
        fullWidth={true}
        isLoading={isPending}
        type="submit"
        label="Change password"
        radius={2}
      />
    </form>
  );
};
