'use client';
import styles from './button.module.css';
import { ButtonProps } from './types';

export const Button = ({ children, className, text, ...rest }: ButtonProps) => {
  return (
    <button
      className={[styles.button, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </button>
  );
};
