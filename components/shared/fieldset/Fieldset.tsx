'use client';
import { FieldsetProps } from './types';
import styles from './Fieldset.module.css';

export const Fieldset = ({ children, className, ...props }: FieldsetProps) => (
  <fieldset
    {...props}
    className={[className, styles.fieldset].filter(Boolean).join(' ')}
  >
    {children}
  </fieldset>
);
