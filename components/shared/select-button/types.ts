import { MouseEventHandler } from 'react';

export type SelectButtonProps = {
  selected: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text: string;
};
