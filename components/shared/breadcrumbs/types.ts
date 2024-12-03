import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type BreadcrumbsProps = {
  children?: React.ReactNode;
};

export type BreadcrumbProps = {
  icon?: IconDefinition;
  text?: string;
  path: string;
  query?: string;
};

export type BreadcrumbTextProps = {
  text: string;
  path: string;
};
