export type CartItemCounterProps = {
  idProduct?: string;
  quanity: number;
  classNameInput?: string;
  className?: string;
  classNamePlus?: string;
  classNameMinus?: string;
  classNameIcon?: string;
  localQuantity?: boolean;
  addLocalQuantity?: () => void;
  subtractLocalQuantity?: () => void;
  addGlobalQuantity?: (id: string) => void;
  subtractGlobalQuantity?: (id: string) => void;
  disabledButtonMinus?: boolean;
  disabledButtonPlus?: boolean;
};
