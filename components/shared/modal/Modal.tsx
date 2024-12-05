import styles from './Modal.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { forwardRef, Ref } from 'react';
import { Loader } from '../loader';
import { ModalProps } from './types';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      cancel = 'Cancel',
      confirm = 'Confirm',
      onClose,
      onConfirm,
      title,
      isPending,
    },
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div className={styles.modalElement} ref={ref}>
        <header className={styles.header}>
          <h5 className={styles.title}>{title}</h5>
          <button className={stylesButton.buttonModalClose} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        <footer className={styles.footer}>
          <button className={stylesButton.buttonCancel} onClick={onClose}>
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
      </div>
    );
  }
);

Modal.displayName = 'Modal';
