'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from '../modal/Modal.module.css';
import { Backdrop } from '../backdrop';
import { Button } from '../button';
import { CSSTransition } from 'react-transition-group';
import { Modal, ModalDeleteContent } from '@/components/shared';
import { ModalDeleteProps } from './types';

export const ModalDelete = ({
  classButton,
  cancel = 'Cancel',
  confirm = 'Confirm',
  children,
  onConfirm,
  textButton,
  title,
  isPending,
  isSuccess,
  onSuccess,
}: ModalDeleteProps) => {
  const nodeRef = useRef(null);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    if (showModal && isSuccess && !isPending) {
      if (onSuccess) onSuccess();
      setModal(false);
    }
  }, [isPending, isSuccess, showModal, onSuccess]);

  return (
    <>
      <Button
        className={classButton}
        onClick={() => setModal(true)}
        text={textButton}
      />
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
          <ModalDeleteContent
            title={title}
            cancel={cancel}
            confirm={confirm}
            isPending={isPending}
            onCancel={() => setModal(false)}
            onClose={() => setModal(false)}
            onConfirm={onConfirm}
          >
            {children}
          </ModalDeleteContent>
        </Modal>
      </CSSTransition>
    </>
  );
};
