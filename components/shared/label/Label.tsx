import styles from './Label.module.css';
import { classNames } from '@/helpers';
import { LabelProps } from './types';

export const Label = ({ htmlFor, className, children }: LabelProps) => (
  <label htmlFor={htmlFor} className={classNames(styles.label, className!)}>
    {children}
  </label>
);
