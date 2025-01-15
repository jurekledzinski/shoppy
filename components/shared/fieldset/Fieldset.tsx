import styles from './Fieldset.module.css';
import { classNames } from '@/helpers';
import { FieldsetProps } from './types';

export const Fieldset = ({ children, className, ...props }: FieldsetProps) => (
  <fieldset {...props} className={classNames(styles.fieldset, className!)}>
    {children}
  </fieldset>
);
