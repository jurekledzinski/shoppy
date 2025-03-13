import styles from './Alert.module.css';
import { AlertProps } from './types';
import { classNames } from '@/helpers';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../icon';

export const Alert = ({
  children,
  icon = faExclamationCircle,
  color = 'warning',
  marginBottom,
  marginTop,
}: AlertProps) => {
  const classNamesAlert = classNames(styles.alert, styles[color]);

  return (
    <div className={classNamesAlert} style={{ marginBottom, marginTop }}>
      <Icon icon={icon} size="sm" />
      <p className={styles.text}>{children}</p>
    </div>
  );
};
