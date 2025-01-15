import styles from './Alert.module.css';
import { AlertProps } from './types';
import { classNames } from '@/helpers';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Alert = ({
  className,
  children,
  icon = faExclamationCircle,
}: AlertProps) => {
  return (
    <div className={classNames(styles.alert, className!)}>
      <span className={styles.icon}>
        <FontAwesomeIcon icon={icon} />
      </span>
      <p className={styles.text}>{children}</p>
    </div>
  );
};
