import styles from './Temp.module.css';
import { ButtonBaseContentProps } from './types';
import { Icon } from '../icon';
import { Loader } from '../loader/Loader';

const sizesSchema = {
  small: 16,
  medium: 16,
  large: 18,
};

export const ButtonBaseContent = ({
  isLoading,
  iconEnd,
  iconStart,
  size,
  label,
}: ButtonBaseContentProps) => {
  return (
    <>
      {isLoading && iconStart && !iconEnd ? (
        <span className={styles.iconStart}>
          <Loader size={sizesSchema[size as keyof typeof size]} />
        </span>
      ) : (
        iconStart && (
          <span className={styles.iconStart}>
            <Icon icon={iconStart} size="sm" />
          </span>
        )
      )}

      {isLoading && !iconStart && !iconEnd ? (
        <>
          <span className={styles.iconCenter}>
            <Loader size={sizesSchema[size as keyof typeof size]} />
          </span>
          <span className={styles.label}>{label}</span>
        </>
      ) : (
        <span className={styles.label}>{label}</span>
      )}

      {isLoading && iconEnd ? (
        <span className={styles.iconEnd}>
          <Loader size={sizesSchema[size as keyof typeof size]} />
        </span>
      ) : (
        iconEnd && (
          <span className={styles.iconEnd}>
            <Icon icon={iconEnd} size="sm" />
          </span>
        )
      )}
    </>
  );
};
