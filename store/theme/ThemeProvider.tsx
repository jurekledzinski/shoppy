'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeContext = {
  mode: string;
  onChange?: (mode: string) => void;
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContext>({ mode: 'light' });

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
    setTheme({ mode: themeLocal });
  }, []);

  const value = useMemo(
    () => ({
      ...theme,
      onChange: (mode: string) => {
        setTheme({ mode });
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
