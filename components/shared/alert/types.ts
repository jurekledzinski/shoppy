import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type AlertProps = {
  children?: React.ReactNode;
  color?: 'info' | 'negative' | 'primary' | 'secondary' | 'success' | 'warning';
  icon?: IconDefinition;
  marginTop?: 4 | 8 | 12 | 16 | 20 | 24;
  marginBottom?: 4 | 8 | 12 | 16 | 20 | 24;
};
