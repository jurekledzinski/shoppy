import { ChangeEventHandler } from 'react';

export type AccordionContentProps = {
  active: boolean;
  children?: React.ReactNode;
  className?: string;
};

export type AccordionHeaderProps = {
  checked?: boolean;
  name: string;
  title: string;
  onClick?: (id: string) => void;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type AccordionProps = {
  children: React.ReactNode;
};
