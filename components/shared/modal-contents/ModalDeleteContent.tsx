import styles from './ModalContent.module.css';
import { Button } from '../button';
import { classNames } from '@/helpers';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../icon-button/IconButton';
import { ModalDeleteContentProps } from './types';

export const ModalDeleteContent = ({
  children,
  title,
  cancel,
  confirm,
  isPending,
  onCancel,
  onClose,
  onConfirm,
}: ModalDeleteContentProps) => {
  return (
    <>
      <header className={classNames(styles.header, styles.headerDelete)}>
        <h5 className={styles.title}>{title}</h5>
        <IconButton
          color="contrast"
          icon={faXmark}
          onClick={onClose}
          size="extra-small"
          variant="contained"
        />
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
          color="negative"
          disabled={isPending}
          isLoading={isPending}
          type="button"
          label={confirm ?? ''}
          onClick={onConfirm}
          radius={2}
        />
      </footer>
    </>
  );
};
