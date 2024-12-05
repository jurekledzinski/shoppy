import styles from './button.module.css';
import { ButtonProps } from './types';
import { classNames } from '@/helpers';

export const Button = ({
  children,
  className,
  disabled,
  text,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={classNames(styles.button, className!)}
      disabled={disabled}
      {...(onClick && { onClick })}
      {...rest}
    >
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </button>
  );
};
