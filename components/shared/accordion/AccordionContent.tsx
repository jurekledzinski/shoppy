'use client';
import styles from './Accordion.module.css';
import { AccordionContentProps } from './types';
import { useRef } from 'react';

export const AccordionContent = ({
  active,
  children,
}: AccordionContentProps) => {
  const refContent = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={styles.content}
      ref={refContent}
      style={{
        maxHeight: active ? `${refContent.current?.scrollHeight}px` : '0px',
      }}
    >
      {children}
    </div>
  );
};
