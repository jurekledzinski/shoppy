import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type IconBaseButtonProps = {
  border?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  icon: IconDefinition;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  radius?: 0 | 2 | 4 | 8 | 16 | 50;
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  color?:
    | 'contrast'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'negative'
    | 'warning';
  variant: 'contained' | 'minimal' | 'outlined' | 'text';
};

export interface IconButtonProps
  extends IconBaseButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {}

export interface IconLinkButtonProps
  extends IconBaseButtonProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> {
  href: string;
  type?: never;
}

export type IconButtonBaseContentProps = {
  children?: React.ReactNode;
  icon: IconDefinition;
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'negative' | 'warning';
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  variant?: 'contained' | 'minimal' | 'outlined' | 'text';
};
