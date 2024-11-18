import { LabelProps } from './types';
import styles from './Label.module.css';

export const Label = ({ htmlFor, className, children }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={[className, styles.label].filter(Boolean).join(' ')}
  >
    {children}
  </label>
);
