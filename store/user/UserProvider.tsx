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
    }),
    [user]
  );

  return (
    <ThemeContext.Provider
      value={{
        ...value,
        onChange: (data) => {
          setUser(data);
          if (data) localStorage.setItem('user', JSON.stringify(data));
          else localStorage.removeItem('user');
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default UserProvider;
