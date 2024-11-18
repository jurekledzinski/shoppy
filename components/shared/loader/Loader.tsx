import styles from './Loader.module.css';
import { LoaderProps } from './types';

export const Loader = ({ ...props }: LoaderProps) => {
  return (
    <span
      {...props}
      className={[styles.loader, props.className].filter(Boolean).join(' ')}
    ></span>
  );
};
