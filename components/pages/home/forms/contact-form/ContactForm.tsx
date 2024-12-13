import stylesButton from '@styles/buttons.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  FieldTextarea,
  Loader,
} from '@/components/shared';
import { ContactFormProps } from './types';

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
        <AlertError>{state.message}</AlertError>
      )}

      <Button
        className={stylesButton.buttonConfirmFullWidth}
        disabled={isPending}
        type="submit"
        text="Send message"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
