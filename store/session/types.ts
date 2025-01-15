export type SessionContextType = {
  guestUser: string | null;
  userSession: string | null;
  onSetValue: (key: string, value: string | null) => void;
};

export type SessionUserProviderProps = {
  children: React.ReactNode;
};
