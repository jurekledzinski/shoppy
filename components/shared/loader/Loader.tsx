import styles from './Loader.module.css';
import { classNames } from '@/helpers';
import { LoaderProps } from './types';

export const Loader = ({ ...props }: LoaderProps) => {
  return (
    <span
      {...props}
      className={classNames(styles.loader, props.className!)}
    ></span>
  );
};
