import styles from './ModalContent.module.css';
import { Button } from '../button';
import { classNames } from '@/helpers';
import { ModalWarningContentProps } from './types';

export const ModalWarningContent = ({
  children,
  title,
  confirm,
  isPending,
  onConfirm,
}: ModalWarningContentProps) => {
  return (
    <>
      <header className={classNames(styles.header, styles.headerWarning)}>
        <h5 className={styles.title}>{title}</h5>
      </header>
      <div className={styles.body}>{children}</div>
      <footer className={styles.footer}>
        <Button
          color="warning"
          disabled={isPending}
          isLoading={isPending}
          label={confirm ?? ''}
          onClick={onConfirm}
          radius={2}
        />
      </footer>
    </>
  );
};
