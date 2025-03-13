import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export interface IconProps extends FontAwesomeIconProps {
  color?: 'info' | 'negative' | 'primary' | 'secondary' | 'success' | 'warning';
}
