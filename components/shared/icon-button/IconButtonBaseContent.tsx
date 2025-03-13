import styles from './IconButton.module.css';
import { Icon } from '../icon';
import { IconButtonBaseContentProps } from './types';
import { Loader } from '../loader/Loader';

export const IconButtonBaseContent = ({
  children,
  icon,
  isLoading,
  size,
}: IconButtonBaseContentProps) => {
  return (
    <>
      {isLoading ? (
        <>
          <span className={styles.iconCenter}>
            <Loader sizeSchema={size} />
          </span>
          <Icon icon={icon} size="sm" />
          {children}
        </>
      ) : (
        <>
          {icon ? (
            <>
              <Icon icon={icon} size="sm" />
              {children}
            </>
          ) : null}
        </>
      )}
    </>
  );
};
