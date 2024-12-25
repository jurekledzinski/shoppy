export type AsideType =
  | string
  | 'cart'
  | 'menu'
  | 'contact'
  | 'login'
  | 'register'
  | 'forget-password'
  | 'reset_password'
  | 'procced-checkout-options'
  | null;

export type Checkout = null | 'login' | 'register';

export type AsideState = {
  checkout?: Checkout;
  type: AsideType;
  value: boolean;
  onChange: (type: AsideType, value: boolean, checkout?: Checkout) => void;
};

export type AsideProviderProps = {
  children: React.ReactNode;
};
