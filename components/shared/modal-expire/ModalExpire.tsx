'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../modal/Modal.module.css';
import { Backdrop } from '../backdrop';
import { CSSTransition } from 'react-transition-group';
import { Modal } from '@/components/shared';
import { ModalExpireProps } from './types';

export const ModalExpire = ({
  cancel,
  confirm,
  children,
  onConfirm,
  title,
  isPending,
  isSuccess,
  isOpen,
  onSuccess,
}: ModalExpireProps) => {
  const nodeRef = useRef(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showModal, setModal] = useState(false);

  console.log('isOpen', isOpen);

  useEffect(() => {
    if (isSuccess) {
      if (onSuccess) onSuccess();
      setModal(false);
    }
  }, [isSuccess, onSuccess]);

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
        <Modal
          ref={nodeRef}
          title={title}
          cancel={cancel}
          confirm={confirm}
          onClose={() => setModal(false)}
          onConfirm={onConfirm}
          isPending={isPending}
        >
          {children}
        </Modal>
      </CSSTransition>
    </>
  );
};
