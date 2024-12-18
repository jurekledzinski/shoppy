import { ChangeEventHandler } from 'react';

export type AccordionContentProps = {
  active: boolean;
  children?: React.ReactNode;
};

export type AccordionHeaderProps = {
  name: string;
  //   onClick: (name: string) => void;
  title: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type AccordionProps = {
  children: React.ReactNode;
};
