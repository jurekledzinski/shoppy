import { Dispatch, SetStateAction } from 'react';

export type SessionContextType = {
  guestUser: string | null;
  userSession: string | null;
  setSessionUser?: Dispatch<SetStateAction<SessionContextType>>;
};

// type SessionUser = {
//   guestUser: string | null;
//   user: string | null;
// };

export type SessionUserProviderProps = {
  children: React.ReactNode;
};
