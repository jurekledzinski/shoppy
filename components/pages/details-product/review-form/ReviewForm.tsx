'use client';
import stylesButton from '@styles/buttons.module.css';
import styles from './ReviewForm.module.css';
import {
  AlertError,
  Button,
  ErrorMessage,
  Loader,
  FieldTextarea,
  FieldRating,
} from '@/components/shared';

import { ReviewFormProps } from './types';
import { classNames } from '@/helpers';

export const ReviewForm = ({
  methods,
  onSubmitAction,
  state,
  isPending,
}: ReviewFormProps) => {
  const { formState, control } = methods;
  const { errors } = formState;

  return (
    <form className={styles.form} onSubmit={onSubmitAction}>
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

      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}

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
