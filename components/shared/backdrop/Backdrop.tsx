'use client';
import styles from './Backdrop.module.css';
import { BackdropProps } from './types';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

export const Backdrop = ({ onClick, show }: BackdropProps) => {
  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={show}
        timeout={300}
        classNames={{
          enter: styles.backdropEnter,
          enterActive: styles.backdropEnterActive,
          exit: styles.backdropExit,
          exitActive: styles.backdropExitActive,
        }}
        unmountOnExit
      >
        <div
          ref={nodeRef}
          className={styles.backdropElement}
          onClick={onClick}
        />
      </CSSTransition>
    </>
  );
};
