import { MouseEventHandler } from 'react';

export type MenuProps = {
  children: React.ReactNode;
};

export type MenuItemProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLLIElement>;
};
