'use client';

import { useCart } from '@/store/cart';
import { DisplayOnstockProps } from './types';

export const DisplayOnstock = ({ className, data }: DisplayOnstockProps) => {
  const { state } = useCart();

  const currentProductId = data._id;

  const productInCart = state.cart.products.find(
    (product) => product._id === currentProductId
  );

  return (
    <span className={className}>
      On stock:
      {productInCart ? data.onStock - productInCart.quantity : data.onStock}
    </span>
  );
};
