import { MouseEventHandler } from 'react';

export type QuestionRedirectProps = {
  buttonText: string;
  question: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};
