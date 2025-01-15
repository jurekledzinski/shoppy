'use client';
import styles from './Accordion.module.css';
import { AccordionContentProps } from './types';
import { useRef } from 'react';
import { classNames } from '@/helpers';

export const AccordionContent = ({
  active,
  children,
  className,
}: AccordionContentProps) => {
  const refContent = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={classNames(styles.content, className!)}
      ref={refContent}
      style={{
        maxHeight: active ? `${refContent.current?.scrollHeight}px` : '0px',
      }}
    >
      {children}
    </div>
  );
};
