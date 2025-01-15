import stylesButton from '@styles/buttons.module.css';
import { ResetPasswordFormProps } from './types';

import {
  Alert,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';
import { patternPassword, validateConfirmPassword } from '@/helpers';

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

      {!state.success && state.message && <Alert>{state.message}</Alert>}

      <Button
        className={stylesButton.buttonConfirmFullWidth}
        disabled={isPending}
        type="submit"
        text="Change password"
      >
        {isPending && <Loader />}
      </Button>
      <Button
        className={stylesButton.buttonCancelFullWidth}
        disabled={isPending}
        text="Cancel"
        onClick={onCancel}
      />
    </form>
  );
};
