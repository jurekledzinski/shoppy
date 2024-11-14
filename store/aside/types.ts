export type AsideType = 'cart' | 'menu' | null;

export type AsideState = {
  type: AsideType;
  value: boolean;
  onChange: (type: AsideType, value: boolean) => void;
};

export type AsideProviderProps = {
  children: React.ReactNode;
};
