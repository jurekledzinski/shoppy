import styles from './Input.module.css';
import { classNames } from '@/helpers';
import { InputProps } from './types';

export const Input = ({ className, ...props }: InputProps) => (
  <input
    {...props}
    className={classNames(styles.input, className!)}
    id={props.name}
  />
);
