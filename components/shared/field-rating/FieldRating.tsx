'use client';
import styles from './FieldRating.module.css';
import { FieldRatingProps } from './types';
import { FieldValues, Path, PathValue, useController } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

export const FieldRating = <T extends FieldValues>({
  label,
  name,
  control,
  message,
  ...rest
}: FieldRatingProps<T>) => {
  const {
    field: { onChange, value },
  } = useController({
    name,
    control,
    defaultValue: 0 as PathValue<T, Path<T>>,
    rules: {
      validate: (value) => (typeof value === 'number' && value > 0) || message,
    },
  });

  return (
    <fieldset className={styles.fieldset}>
      {label && <label className={styles.label}>{label}</label>}
      <Rating
        className={styles.rating}
        onClick={onChange}
        initialValue={value as number}
        allowFraction={true}
        size={16}
        {...rest}
      />
    </fieldset>
  );
};
