import styles from './ReviewForm.module.css';
import stylesButton from '@styles/buttons.module.css';
import { classNames } from '@/helpers';
import { ReviewFormProps } from './types';
import {
  Alert,
  Button,
  ErrorMessage,
  Loader,
  FieldTextarea,
  FieldRating,
} from '@/components/shared';

export const ReviewForm = ({
  methods,
  onSubmit,
  state,
  isPending,
}: ReviewFormProps) => {
  const { formState, control } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <FieldTextarea
        label="Review"
        placeholder="Review"
        {...methods.register('review', {
          required: { message: 'Review is required', value: true },
        })}
        rows={8}
      />

      {errors.review && <ErrorMessage>{errors.review.message}</ErrorMessage>}

      <FieldRating
        control={control}
        message="Rating is required"
        name={'rate'}
      />

      {errors.rate && <ErrorMessage>{errors.rate.message}</ErrorMessage>}

      {!state.success && state.message && <Alert>{state.message}</Alert>}

      <Button
        className={classNames(stylesButton.buttonConfirm, styles.button)}
        disabled={isPending}
        type="submit"
        text="Add review"
      >
        {isPending && <Loader />}
      </Button>
    </form>
  );
};
