export type CartItemCounterProps = {
  classNameInput?: string;
  className?: string;
  classNamePlus?: string;
  classNameMinus?: string;
  localQuantity?: boolean;
  addLocalQuantity?: () => void;
  subtractLocalQuantity?: () => void;
  addGlobalQuantity?: () => void;
  subtractGlobalQuantity?: () => void;
  quanity: number;
  onStock: number;
};
