'use client';
import { CSSTransition } from 'react-transition-group';
import { useAside } from '@/store/aside';
import { useRef } from 'react';
import './Backdrop.css';

export const Backdrop = () => {
  const context = useAside();
  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        nodeRef={nodeRef}
        in={context.value}
        timeout={300}
        classNames="backdrop"
        unmountOnExit
      >
        <div
          className="backdrop"
          onClick={() => {
            context.onChange(null, false);
          }}
        />
      </CSSTransition>
    </>
  );
};
