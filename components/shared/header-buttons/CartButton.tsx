'use client';
import { Badge } from '../badge';
import { controlAsidePanel, formatAmountCart } from './helpers';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../icon-button/IconButton';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';

export const CartButton = () => {
  const context = useAside();
  const { state } = useCart();
  const areProducts = state.cart && state.cart.products.length;

  return (
    <IconButton
      icon={faCartShopping}
      variant="minimal"
      onClick={() => controlAsidePanel(context, 'cart')}
    >
      {areProducts ? (
        <Badge color="primary" value={formatAmountCart(state)} />
      ) : null}
    </IconButton>
  );
};
