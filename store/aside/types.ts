export type AsideType =
  | 'cart'
  | 'menu'
  | 'contact'
  | 'login'
  | 'register'
  | 'change-password'
  | null;

export type AsideState = {
  type: AsideType;
  value: boolean;
  onChange: (type: AsideType, value: boolean) => void;
};

export type AsideProviderProps = {
  children: React.ReactNode;
};
