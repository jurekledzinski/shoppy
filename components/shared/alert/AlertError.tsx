import styles from './AlertError.module.css';
import { AlertErrorProps } from './types';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AlertError = ({ className, children }: AlertErrorProps) => {
  return (
    <div className={[styles.alertError, className].filter(Boolean).join(' ')}>
      <span className={styles.alertIcon}>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
      <p className={styles.alertText}>{children}</p>
    </div>
  );
};
