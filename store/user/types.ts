export type UserTypes = {
  id: string;
  email: string;
  name: string;
  auth: string;
} | null;

export type UserContextType = {
  payload: UserTypes;
  onChange?: (user: UserTypes) => void;
};

export type UserProviderProps = {
  children: React.ReactNode;
};
