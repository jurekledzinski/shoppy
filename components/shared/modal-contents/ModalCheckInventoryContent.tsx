import styles from './ModalContent.module.css';
import { Button } from '../button';
import { classNames } from '@/helpers';
import { ModalCheckInventoryContentProps } from './types';

export const ModalCheckInventoryContent = ({
  children,
  title,
  cancel,
  confirm,
  isPending,
  onCancel,
  onConfirm,
}: ModalCheckInventoryContentProps) => {
  return (
    <>
      <header className={classNames(styles.header, styles.headerInfo)}>
        <h5 className={styles.title}>{title}</h5>
      </header>
      <div className={styles.body}>{children}</div>
      <footer className={styles.footer}>
        <Button
          color="secondary"
          label={cancel ?? ''}
          onClick={onCancel}
          variant="outlined"
          radius={2}
        />
        <Button
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
