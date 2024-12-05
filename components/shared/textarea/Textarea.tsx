import styles from './Textarea.module.css';
import { classNames } from '@/helpers';
import { TextareaProps } from './types';

export const Textarea = ({ className, ...props }: TextareaProps) => (
  <textarea
    {...props}
    className={classNames(styles.textarea, className!)}
    id={props.name}
  />
);
