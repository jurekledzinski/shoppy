import Link from 'next/link';
import styles from './IconButton.module.css';
import { classNames } from '@/helpers';
import { IconButtonBaseContent } from './IconButtonBaseContent';
import { IconButtonProps, IconLinkButtonProps } from './types';

export const IconButton = ({
  border = 'xs',
  children,
  color,
  disabled,
  fullWidth,
  icon,
  isLoading,
  onClick,
  radius = 0,
  size = 'medium',
  variant = 'contained',
  ...props
}: IconButtonProps | IconLinkButtonProps) => {
  const iconButtonNames = classNames(
    styles.iconButton,
    styles[color as keyof typeof styles],
    styles[size as keyof typeof styles],
    styles[variant as keyof typeof styles],
    styles[radius as keyof typeof styles],
    styles[border as keyof typeof styles],
    fullWidth ? styles.fullWidth : '',
    disabled || isLoading ? styles.disabled : ''
  );

  if ('href' in props) {
    return (
      <Link
        aria-label="Icon link button"
        role="link"
        className={iconButtonNames}
        {...(disabled || isLoading ? {} : { href: props.href })}
        style={{ borderRadius: `${radius}px` }}
        {...props}
      >
        <IconButtonBaseContent icon={icon} isLoading={isLoading} size={size}>
          {children}
        </IconButtonBaseContent>
      </Link>
    );
  }

  return (
    <button
      aria-label="Icon button"
      className={iconButtonNames}
      disabled={disabled || isLoading}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      style={{ borderRadius: `${radius}px` }}
      {...props}
    >
      <IconButtonBaseContent icon={icon} isLoading={isLoading} size={size}>
        {children}
      </IconButtonBaseContent>
    </button>
  );
};
