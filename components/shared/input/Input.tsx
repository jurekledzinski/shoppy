'use client';
import { InputProps } from './types';
import styles from './Input.module.css';

export const Input = ({ className, ...props }: InputProps) => (
  <input
    {...props}
    className={[className, styles.input].filter(Boolean).join(' ')}
    id={props.name}
  />
);
