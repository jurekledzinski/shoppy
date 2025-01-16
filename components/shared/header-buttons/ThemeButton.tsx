'use client';
import styles from './ThemeButton.module.css';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/store/theme';

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
            color: theme.mode === 'light' ? '#333333' : '#ffffff',
          },
        }}
      />
      <button
        className={styles.themeButton}
        onClick={() => {
          if (theme && theme.onChange && theme.mode === 'light') {
            return theme.onChange('dark');
          }

          if (theme && theme.onChange && theme.mode === 'dark') {
            theme.onChange('light');
          }
        }}
      >
        {theme && theme.mode === 'light' && <FontAwesomeIcon icon={faMoon} />}
        {theme && theme.mode === 'dark' && <FontAwesomeIcon icon={faSun} />}
      </button>
    </>
  );
};
