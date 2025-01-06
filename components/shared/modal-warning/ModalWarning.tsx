'use client';
import styles from '../modal/Modal.module.css';
import { Backdrop } from '../backdrop';
import { CSSTransition } from 'react-transition-group';
import { Modal, ModalWarningContent } from '@/components/shared';
import { ModalWarningProps } from './types';
import { useEffect, useRef, useState } from 'react';

export const ModalWarning = ({
  cancel,
  confirm,
  children,
  onCancel,
  onConfirm,
  title,
  isPending,
  isOpen,
}: ModalWarningProps) => {
  const nodeRef = useRef(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    setShowBackdrop(isOpen);
    setModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <Backdrop show={showBackdrop} />
      <CSSTransition
        in={showModal}
        nodeRef={nodeRef}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit
        onEnter={() => setShowBackdrop(true)}
        onExited={() => setShowBackdrop(false)}
      >
        <Modal ref={nodeRef}>
          <ModalWarningContent
            title={title}
            cancel={cancel}
            confirm={confirm}
            isPending={isPending}
            onCancel={onCancel}
            onConfirm={onConfirm}
          >
            {children}
          </ModalWarningContent>
        </Modal>
      </CSSTransition>
    </>
  );
};
