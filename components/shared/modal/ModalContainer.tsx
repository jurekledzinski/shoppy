'use client';
import styles from './Modal.module.css';
import { Backdrop } from '../backdrop';
import { Button } from '../button';
import { CSSTransition } from 'react-transition-group';
import { Modal } from './Modal';
import React, { useEffect, useRef, useState } from 'react';
import { ModalContainerProps } from './types';

export const ModalContainer = ({
  classButton,
  cancel,
  confirm,
  children,
  onConfirm,
  title,
  isPending,
  isSuccess,
  onSuccess,
}: ModalContainerProps) => {
  const nodeRef = useRef(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      onSuccess && onSuccess();
      setModal(false);
    }
  }, [isSuccess]);

  return (
    <>
      <Button
        className={classButton}
        onClick={() => setModal(true)}
        text="Delete account by modAL"
      ></Button>
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
