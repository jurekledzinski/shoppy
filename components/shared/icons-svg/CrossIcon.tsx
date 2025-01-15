import styles from './Icons.module.css';
import { classNames } from '@/helpers';

export const CrossIcon = () => {
  return (
    <svg
      className={classNames(styles.cross)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle cx="26" cy="26" r="24" />
      <path d="M16 16 L36 36" />
      <path d="M36 16 L16 36" />
    </svg>
  );
};
