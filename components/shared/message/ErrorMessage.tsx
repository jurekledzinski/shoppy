import styles from './ErrorMessage.module.css';
import { ErrorMessageProps } from './types';

export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className={styles.error}>{children}</p>;
};
