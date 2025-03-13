import styles from './TermsConditionsForm.module.css';
import { Alert, Button, ErrorMessage } from '@/components/shared';
import { TermsConditionsFormProps } from './types';

export const TermsConditionsForm = ({
  isEmpty,
  isPending,
  methods,
  textSubmit,
  state,
  onSubmit,
}: TermsConditionsFormProps) => {
  const { formState } = methods;
  const { errors } = formState;
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Button
        disabled={isEmpty || isPending}
        fullWidth={true}
        isLoading={isPending}
        type="submit"
        label={textSubmit}
        radius={2}
      />

      <label className={styles.label} htmlFor="termsConditions">
        <input
          type="checkbox"
          id="termsConditions"
          {...methods.register('termsConditions', {
            required: {
              message: 'Accept terms conditions is required',
              value: true,
            },
          })}
        />
        <span className={styles.text}>Terms conditions</span>
      </label>

      {errors.termsConditions && (
        <ErrorMessage>{errors.termsConditions.message}</ErrorMessage>
      )}

      {!state.success && state.message && !isEmpty && (
        <Alert marginTop={8} color="negative">
          {state.message}
        </Alert>
      )}
    </form>
  );
};
