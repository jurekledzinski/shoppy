'use client';
import styles from './QuestionRedirect.module.css';
import { QuestionRedirectProps } from './types';

export const QuestionRedirect = ({
  buttonText,
  onClick,
  question,
}: QuestionRedirectProps) => {
  return (
    <span className={styles.info}>
      {question}{' '}
      <button className={styles.info} onClick={onClick}>
        {buttonText}
      </button>
    </span>
  );
};
