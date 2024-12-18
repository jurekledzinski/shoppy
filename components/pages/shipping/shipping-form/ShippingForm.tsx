import stylesButton from '@styles/buttons.module.css';
import stylesShipping from './ShippingForm.module.css';
import { ShippingFormProps } from './types';

import {
  AlertError,
  Button,
  ErrorMessage,
  FieldInput,
  Loader,
} from '@/components/shared';

export const ShippingForm = ({
  methods,
  onCancel,
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
        <AlertError>{state.message}</AlertError>
      )}

      <div className={stylesShipping.buttonGroup}>
        <Button
          className={stylesButton.buttonCancelFullWidth}
          disabled={isPending}
          text="Cancel"
          onClick={onCancel}
        />
        <Button
          className={stylesButton.buttonConfirmFullWidth}
          disabled={isPending}
          type="submit"
          text="Add shipping address"
        >
          {isPending && <Loader />}
        </Button>
      </div>
    </form>
  );
};
