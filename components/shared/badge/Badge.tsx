import styles from './Badge.module.css';
import { BadgeProps } from './type';
import { classNames } from '@/helpers';

export const Badge = ({
  color,
  horizontal = 'right',
  value,
  vertical = 'top',
}: BadgeProps) => {
  const classNamesBadge = classNames(
    styles.badge,
    styles[color as keyof typeof styles],
    styles[horizontal as keyof typeof styles],
    styles[vertical as keyof typeof styles]
  );

  return <span className={classNamesBadge}>{value}</span>;
};
