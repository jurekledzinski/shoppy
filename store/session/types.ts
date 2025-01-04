import { Dispatch, SetStateAction } from 'react';

export type SessionContextType = {
  guestUser: string | null;
  userSession: string | null;
  setSessionUser?: Dispatch<SetStateAction<SessionContextType>>;
};

export type SessionUserProviderProps = {
  children: React.ReactNode;
};
