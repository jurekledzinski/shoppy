import styles from './AlertError.module.css';
import { AlertErrorProps } from './types';
import { classNames } from '@/helpers';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const AlertError = ({ className, children }: AlertErrorProps) => {
  return (
    <div className={classNames(styles.alertError, className!)}>
      <span className={styles.alertIcon}>
        <FontAwesomeIcon icon={faExclamationCircle} />
      </span>
      <p className={styles.alertText}>{children}</p>
    </div>
  );
};
