'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '@/store/theme';
import styles from './ThemeButton.module.css';

const ThemeButton = () => {
  const theme = useTheme();

  return (
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
  );
};

export default ThemeButton;
