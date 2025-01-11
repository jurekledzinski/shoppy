import styles from './TermsConditionsForm.module.css';
import stylesButton from '@styles/buttons.module.css';
import { AlertError, Button, ErrorMessage, Loader } from '@/components/shared';
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
        className={stylesButton.buttonConfirmFullWidth}
        disabled={isEmpty || isPending}
        type="submit"
        text={textSubmit}
      >
        {isPending && <Loader />}
      </Button>

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
        <span>Terms conditions</span>
      </label>

      {errors.termsConditions && (
        <ErrorMessage>{errors.termsConditions.message}</ErrorMessage>
      )}

      {!state.success && state.message && !isEmpty && (
        <AlertError>{state.message}</AlertError>
      )}
    </form>
  );
};
