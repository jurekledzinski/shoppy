import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type BreadcrumbsProps = {
  children?: React.ReactNode;
  data?: BreadcrumbData[];
};

export type BreadcrumbProps = {
  icon?: IconDefinition;
  text?: string;
  path: string;
};

export type BreadcrumbData = {
  name: string;
  path: string;
};
