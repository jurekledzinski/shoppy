'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { UserContextType, UserProviderProps, UserTypes } from './types';

export const ThemeContext = createContext<UserContextType>({ payload: null });

export const useUser = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Place is not wrapped by UserProvider');
  }

  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserTypes>(null);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user')!) || null;
    setUser(userLocal);
  }, []);

  const value = useMemo(
    () => ({
      payload: user,
      onchange: (data: UserTypes) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      },
    }),
    [user]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default UserProvider;
