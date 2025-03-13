import Link from 'next/link';
import styles from './Button.module.css';
import { ButtonBaseContent } from './ButtonBaseContent';
import { ButtonProps, LinkButtonProps } from './types';
import { classNames } from '@/helpers';

export const Button = ({
  border = 'xs',
  color = 'primary',
  disabled,
  fullWidth,
  isLoading,
  iconStart,
  iconEnd,
  label,
  multiSelect,
  radius = 0,
  singleSelect,
  size = 'medium',
  variant = 'contained',
  ...props
}: ButtonProps | LinkButtonProps) => {
  const isMultiSelected = multiSelect?.includes(props.id || '');

  const buttonClassNames = classNames(
    styles.button,
    styles[color as keyof typeof styles],
    styles[size as keyof typeof styles],
    styles[variant as keyof typeof styles],
    styles[radius as keyof typeof styles],
    styles[border as keyof typeof styles],
    disabled || isLoading ? styles.disabled : '',
    fullWidth ? styles.fullWidth : '',
    isMultiSelected ? styles.selected : '',
    singleSelect ? styles.singleSelect : ''
  );

  if ('href' in props) {
    return (
      <Link
        aria-label="Link button"
        role="link"
        className={buttonClassNames}
        {...(disabled || isLoading ? {} : { href: props.href })}
        style={{ borderRadius: `${radius}px` }}
        {...props}
      >
        <ButtonBaseContent
          label={label}
          iconEnd={iconEnd}
          iconStart={iconStart}
          isLoading={isLoading}
          size={size}
        />
      </Link>
    );
  }

  return (
    <button
      aria-label="Button"
      className={buttonClassNames}
      disabled={disabled || isLoading}
      style={{ borderRadius: `${radius}px` }}
      {...props}
    >
      <ButtonBaseContent
        label={label}
        iconEnd={iconEnd}
        iconStart={iconStart}
        isLoading={isLoading}
        size={size}
      />
    </button>
  );
};

// as React.MouseEventHandler<HTMLButtonElement>
