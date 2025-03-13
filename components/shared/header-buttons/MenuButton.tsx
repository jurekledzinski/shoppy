'use client';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useAside } from '@/store/aside';
import { IconButton } from '../icon-button/IconButton';
import { controlAsidePanel } from './helpers';

export const MenuButton = () => {
  const context = useAside();

  return (
    <IconButton
      icon={faBars}
      variant="minimal"
      size="large"
      onClick={() => controlAsidePanel(context, 'menu')}
    />
  );
};
