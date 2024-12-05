import styles from './FieldInput.module.css';
import { classNames } from '@/helpers';
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
    <Fieldset className={classNames(styles.fieldset, classNameField!)}>
      {label && (
        <Label
          className={classNames(styles.label, classNameLabel!)}
          htmlFor={name}
        >
          {label}
        </Label>
      )}
      {children ?? (
        <Input
          {...rest}
          className={classNames(classNameInput!, styles.input)}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      )}
    </Fieldset>
  );
};
