import { ContactFormProps } from './types';
import {
  Alert,
  Button,
  ErrorMessage,
  FieldInput,
  FieldTextarea,
} from '@/components/shared';

export const ContactForm = ({
  isPending,
  methods,
  onSubmit,
  state,
}: ContactFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form onSubmit={onSubmit}>
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

      <FieldTextarea
        label="Message"
        placeholder="Message"
        rows={5}
        cols={3}
        {...methods.register('message', {
          required: { message: 'Message is required', value: true },
          minLength: { message: 'Message is too short', value: 10 },
        })}
      />

      {errors.message && <ErrorMessage>{errors.message.message}</ErrorMessage>}

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
        label="Send message"
        radius={2}
      />
    </form>
  );
};
