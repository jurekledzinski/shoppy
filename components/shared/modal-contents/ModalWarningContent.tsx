import styles from './ModalContent.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { Loader } from '../loader';
import { ModalWarningContentProps } from './types';
import { classNames } from '@/helpers';

export const ModalWarningContent = ({
  cancel,
  children,
  title,
  confirm,
  isPending,
  onCancel,
  onConfirm,
}: ModalWarningContentProps) => {
  return (
    <>
      <header className={classNames(styles.header, styles.headerWarning)}>
        <h5 className={styles.title}>{title}</h5>
      </header>
      <div className={styles.body}>{children}</div>
      <footer className={styles.footer}>
        <button className={stylesButton.buttonCancel} onClick={onCancel}>
          {cancel}
        </button>
        <Button
          className={stylesButton.buttonDelete}
          disabled={isPending}
          text={confirm}
          onClick={onConfirm}
        >
          {isPending && <Loader />}
        </Button>
      </footer>
    </>
  );
};
