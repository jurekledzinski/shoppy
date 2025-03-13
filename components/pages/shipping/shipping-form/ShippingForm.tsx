import stylesShipping from './ShippingForm.module.css';
import { Alert, Button, ErrorMessage, FieldInput } from '@/components/shared';
import { ShippingFormProps } from './types';

export const ShippingForm = ({
  methods,
  onSubmit,
  state,
  isPending,
}: ShippingFormProps) => {
  const { formState } = methods;
  const { errors } = formState;

  return (
    <form className={stylesShipping.form} onSubmit={onSubmit}>
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
        autoComplete="surname"
        label="Surname"
        placeholder="Surname"
        type="text"
        {...methods.register('surname', {
          required: { message: 'Surname is required', value: true },
        })}
      />

      {errors.surname && <ErrorMessage>{errors.surname.message}</ErrorMessage>}

      <FieldInput
        label="Street"
        placeholder="Street"
        type="text"
        {...methods.register('street', {
          required: { message: 'Street is required', value: true },
        })}
      />

      {errors.street && <ErrorMessage>{errors.street.message}</ErrorMessage>}

      <FieldInput
        label="Post code"
        placeholder="Post code"
        type="text"
        {...methods.register('postCode', {
          required: { message: 'Post code is required', value: true },
        })}
      />

      {errors.postCode && (
        <ErrorMessage>{errors.postCode.message}</ErrorMessage>
      )}

      <FieldInput
        label="City"
        placeholder="City"
        type="text"
        {...methods.register('city', {
          required: { message: 'City is required', value: true },
        })}
      />

      {errors.city && <ErrorMessage>{errors.city.message}</ErrorMessage>}

      <FieldInput
        label="Country"
        placeholder="Country"
        type="text"
        {...methods.register('country', {
          required: { message: 'Country is required', value: true },
        })}
      />

      {errors.country && <ErrorMessage>{errors.country.message}</ErrorMessage>}

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
        label="Add shipping address"
        radius={2}
      />
    </form>
  );
};
