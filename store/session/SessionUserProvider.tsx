'use client';
import { createContext, useContext, useMemo, useState } from 'react';
import { SessionContextType, SessionUserProviderProps } from './types';

export const SessionContext = createContext<SessionContextType>({
  guestUser: null,
  userSession: null,
  onSetValue: () => {},
});

export const useSessionUser = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('Place is not wrapped by session user provider');
  }

  return context;
};

const SessionUserProvider = ({ children }: SessionUserProviderProps) => {
  const [sessionUser, setSessionUser] = useState<
    Omit<SessionContextType, 'onSetValue'>
  >({
    guestUser: null,
    userSession: null,
  });

  const value = useMemo(
    () => ({
      guestUser: sessionUser.guestUser,
      userSession: sessionUser.userSession,
      onSetValue: (key: string, value: string | null) => {
        setSessionUser((prev) => ({
          ...prev,
          [key]: value,
        }));
      },
    }),
    [sessionUser]
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export default SessionUserProvider;
