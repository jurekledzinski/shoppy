import styles from './FieldTextarea.module.css';
import { classNames } from '@/helpers';
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
        <Textarea
          {...rest}
          className={classNames(styles.input, classNameTextarea!)}
          name={name}
          placeholder={placeholder}
        />
      )}
    </Fieldset>
  );
};
