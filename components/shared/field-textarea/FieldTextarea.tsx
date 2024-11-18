'use client';
import styles from './FieldTextarea.module.css';
import { Fieldset } from '../fieldset';
import { FieldTextareaProps } from './types';
import { Label } from '../label';
import { Textarea } from '../textarea';

export const FieldTextarea = ({
  children,
  classNameField,
  classNameTextarea,
  classNameLabel,
  label,
  name,
  placeholder,
  ...rest
}: FieldTextareaProps) => {
  return (
    <Fieldset
      className={[classNameField, styles.fieldset].filter(Boolean).join(' ')}
    >
      {label && (
        <Label
          className={[classNameLabel, styles.label].filter(Boolean).join(' ')}
          htmlFor={name}
        >
          {label}
        </Label>
      )}
      {children ?? (
        <Textarea
          {...rest}
          className={[classNameTextarea, styles.input]
            .filter(Boolean)
            .join(' ')}
          name={name}
          placeholder={placeholder}
        />
      )}
    </Fieldset>
  );
};
