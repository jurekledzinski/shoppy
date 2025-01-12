import styles from './PlaceOrderForm.module.css';
import { AlertError, ErrorMessage, SelectButton } from '@/components/shared';
import { PlaceOrderFormProps } from './types';

export const PlaceOrderForm = ({
  Controller,
  methods,
  methodsDelivery,
  methodsPayment,
  onSubmit,
  state,
  titleDelivery,
  titlePayment,
}: PlaceOrderFormProps) => {
  const { control, formState, setValue, watch } = methods;
  const { errors } = formState;

  return (
    <form id="place-order-form" className={styles.form} onSubmit={onSubmit}>
      <h4 className={styles.title}>{titlePayment}</h4>

      <div className={styles.buttonGroup}>
        <Controller
          control={control}
          name="methodPayment"
          render={() => {
            return (
              <>
                {methodsPayment.map((namePayment) => (
                  <SelectButton
                    key={namePayment}
                    selected={watch('methodPayment') === namePayment}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setValue('methodPayment', namePayment);
                    }}
                    text={namePayment}
                  />
                ))}
              </>
            );
          }}
        />
      </div>

      {errors.methodPayment && (
        <ErrorMessage>{errors.methodPayment.message}</ErrorMessage>
      )}

      <h4 className={styles.title}>{titleDelivery}</h4>

      <div className={styles.buttonGroup}>
        <Controller
          control={control}
          name="methodDelivery"
          render={() => {
            return (
              <>
                {methodsDelivery.map((delivery) => (
                  <SelectButton
                    key={delivery.name}
                    selected={watch('methodDelivery') === delivery.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setValue('methodDelivery', delivery.name);
                      setValue('priceDelivery', delivery.price);
                      setValue('timeDelivery', delivery.time);
                    }}
                    text={delivery.name}
                  />
                ))}
              </>
            );
          }}
        />
      </div>

      {errors.methodDelivery && (
        <ErrorMessage>{errors.methodDelivery.message}</ErrorMessage>
      )}

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}
    </form>
  );
};
