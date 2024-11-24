import { MouseEventHandler } from 'react';

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  text?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
