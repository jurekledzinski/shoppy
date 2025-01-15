'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeContextType, ThemeProviderProps } from './types';

export const ThemeContext = createContext<ThemeContextType>({ mode: 'light' });

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('Place is not wrapped by Theme provider');
  }

  return theme;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState({ mode: 'light' });

  useEffect(() => {
    const themeLocal = JSON.parse(localStorage.getItem('mode')!) || 'light';
    document.documentElement.setAttribute('data-theme', themeLocal);
    setTheme({ mode: themeLocal });
  }, []);

  const value = useMemo(
    () => ({
      ...theme,
      onChange: (mode: string) => {
        setTheme({ mode });
        localStorage.setItem('mode', JSON.stringify(mode));
        document.documentElement.setAttribute('data-theme', mode);
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
