import styles from './ModalContent.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { ModalDeleteContentProps } from './types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../loader';
import { classNames } from '@/helpers';

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
        <button className={stylesButton.buttonModalClose} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
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
