import stylesButton from '@styles/buttons.module.css';
import { ForgetPasswordFormProps } from './types';
import {
  Alert,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';

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

      {!state.success && state.message && <Alert>{state.message}</Alert>}

      <Button
        className={stylesButton.buttonConfirmFullWidth}
        disabled={isPending}
        type="submit"
        text="Change password"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
