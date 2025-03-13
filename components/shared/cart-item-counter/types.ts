export type CartItemCounterProps = {
  idProduct?: string;
  quanity: number;
  className?: string;
  localQuantity?: boolean;
  addLocalQuantity?: () => void;
  subtractLocalQuantity?: () => void;
  addGlobalQuantity?: (id: string) => void;
  subtractGlobalQuantity?: (id: string) => void;
  disabledButtonMinus?: boolean;
  disabledButtonPlus?: boolean;
};
