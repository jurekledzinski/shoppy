import { MouseEventHandler } from 'react';

export type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  text?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
