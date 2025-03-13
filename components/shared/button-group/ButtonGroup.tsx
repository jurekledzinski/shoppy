import styles from './ButtonGroup.module.css';
import { ButtonGroupProps } from './types';
import { classNames } from '@/helpers';

export const ButtonGroup = ({
  children,
  fullWidth = false,
  orientation = 'row',
  spacing = 'none',
  marginBottom,
  marginTop,
}: ButtonGroupProps) => {
  const buttonGroupClassNames = classNames(
    styles.buttonGroup,
    styles[orientation as keyof typeof styles],
    styles[spacing as keyof typeof styles],
    fullWidth ? styles.fullWidth : ''
  );

  return (
    <div
      aria-label="Button group"
      className={buttonGroupClassNames}
      role="group"
      style={{ marginTop, marginBottom }}
    >
      {children}
    </div>
  );
};
