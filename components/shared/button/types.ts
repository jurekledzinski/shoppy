import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type BaseButtonProps = {
  label: string;
  border?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconStart?: IconDefinition;
  iconEnd?: IconDefinition;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  radius?: 0 | 2 | 4 | 8 | 16 | 50;
  singleSelect?: boolean;
  multiSelect?: string[];
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'negative' | 'warning';
  variant?: 'contained' | 'outlined' | 'text';
};

export interface ButtonProps
  extends BaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export interface LinkButtonProps
  extends BaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
  type?: never;
}

export type ButtonBaseContentProps = {
  isLoading?: boolean;
  iconStart?: IconDefinition;
  iconEnd?: IconDefinition;
  size?: 'small' | 'medium' | 'large';
  label: string;
};
