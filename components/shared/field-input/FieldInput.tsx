'use client';
import styles from './FieldInput.module.css';
import { FieldInputProps } from './types';
import { Fieldset } from '../fieldset';
import { Input } from '../input';
import { Label } from '../label';

export const FieldInput = ({
  children,
  classNameField,
  classNameInput,
  classNameLabel,
  label,
  name,
  type,
  placeholder,
  ...rest
}: FieldInputProps) => {
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
        <Input
          {...rest}
          className={[classNameInput, styles.input].filter(Boolean).join(' ')}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      )}
    </Fieldset>
  );
};
