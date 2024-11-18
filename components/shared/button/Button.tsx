'use client';
import styles from './button.module.css';
import { ButtonProps } from './types';

export const Button = ({
  children,
  className,
  disabled,
  text,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={[styles.button, className].filter(Boolean).join(' ')}
      disabled={disabled}
      {...rest}
    >
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </button>
  );
};
