import styles from './PlaceOrderForm.module.css';
import { Alert, Button, ErrorMessage } from '@/components/shared';
import { PlaceOrderFormProps } from './types';

type EventButton = React.MouseEvent<HTMLButtonElement, MouseEvent>;

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
                  <Button
                    key={namePayment}
                    label={namePayment}
                    onClick={(e: EventButton) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setValue('methodPayment', namePayment);
                    }}
                    singleSelect={watch('methodPayment') === namePayment}
                    radius={2}
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
                  <Button
                    key={delivery.name}
                    label={delivery.name}
                    onClick={(e: EventButton) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setValue('methodDelivery', delivery.name);
                      setValue('priceDelivery', delivery.price);
                      setValue('timeDelivery', delivery.time);
                    }}
                    singleSelect={watch('methodDelivery') === delivery.name}
                    radius={2}
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
        <Alert marginTop={8} color="negative">
          {state.message}
        </Alert>
      )}
    </form>
  );
};
