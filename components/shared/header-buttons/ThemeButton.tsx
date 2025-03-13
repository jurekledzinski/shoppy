'use client';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/store/theme';
import { IconButton } from '../icon-button/IconButton';
import { controlThemeMode } from './helpers';

export const ThemeButton = () => {
  const theme = useTheme();

  return (
    <>
      <Toaster
        position="top-left"
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: 2,
            backgroundColor: theme.mode === 'light' ? '#ffffff' : '#333333',
            color: theme.mode === 'light' ? '#555555' : '#ffffff',
          },
        }}
      />
      <IconButton
        icon={theme && theme.mode === 'light' ? faMoon : faSun}
        variant="minimal"
        onClick={() => controlThemeMode(theme)}
      />
    </>
  );
};
