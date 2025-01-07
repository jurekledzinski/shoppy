import styles from './ModalContent.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { classNames } from '@/helpers';
import { Loader } from '../loader';
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
        <button className={stylesButton.buttonCancel} onClick={onCancel}>
          {cancel}
        </button>
        <Button
          className={stylesButton.buttonDelete}
          disabled={isPending}
          type="button"
          text={confirm}
          onClick={onConfirm}
        >
          {isPending && <Loader />}
        </Button>
      </footer>
    </>
  );
};
