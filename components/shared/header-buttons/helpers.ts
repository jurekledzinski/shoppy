import { AsideState } from '@/store/aside';
import { CartState } from '@/store/cart';
import { controlAside } from '@/helpers';
import { ThemeContextType } from '@/store/theme';

export const controlAsidePanel = (
  context: AsideState,
  panel: 'cart' | 'menu'
) => {
  const actionElement = context.type;
  const stateOpen = context.value;
  controlAside(context, panel, actionElement, stateOpen);
};

export const controlThemeMode = (theme: ThemeContextType) => {
  if (theme && theme.onChange && theme.mode === 'light') {
    return theme.onChange('dark');
  }

  if (theme && theme.onChange && theme.mode === 'dark') {
    theme.onChange('light');
  }
};

export const formatAmountCart = (state: CartState) => {
  return state.cart.totalAmountCart < 99
    ? state.cart.totalAmountCart
    : 99 + '+';
};
