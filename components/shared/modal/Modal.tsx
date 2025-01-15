import styles from './Modal.module.css';
import { forwardRef, Ref } from 'react';
import { ModalProps } from './types';

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children }, ref: Ref<HTMLDivElement>) => {
    return (
      <div className={styles.modalElement} ref={ref}>
        {children}
      </div>
    );
  }
);

Modal.displayName = 'Modal';
