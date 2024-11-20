export type AsideType =
  | string
  | 'cart'
  | 'menu'
  | 'contact'
  | 'login'
  | 'register'
  | 'forget-password'
  | null;

export type AsideState = {
  type: AsideType;
  value: boolean;
  onChange: (type: AsideType, value: boolean) => void;
};

export type AsideProviderProps = {
  children: React.ReactNode;
};
