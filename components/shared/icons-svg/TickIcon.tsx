import styles from './Icons.module.css';
import { classNames } from '@/helpers';

export const TickIcon = () => {
  return (
    <svg
      className={classNames(styles.tick)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle cx="26" cy="26" r="24" />
      <path d="M14 27 L22 35 L38 17" />
    </svg>
  );
};
