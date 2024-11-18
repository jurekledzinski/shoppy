'use client';
import { TextareaProps } from './types';
import styles from './Textarea.module.css';

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    {...props}
    className={[className, styles.textarea].filter(Boolean).join(' ')}
    id={props.name}
  />
);
