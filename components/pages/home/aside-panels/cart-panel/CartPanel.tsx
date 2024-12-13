import stylesAside from '@/components/shared/aside/Aside.module.css';
import { Cart } from '@/components/shared';
import { CartPanelProps } from './types';

export const CartPanel = ({
  addGlobalQuantity,
  data,
  removeItem,
  subtractGlobalQuantity,
}: CartPanelProps) => {
  return (
    <>
      <header className={stylesAside.headerCart}>
        <span>Shopping cart</span>
        {data.cart.products.length ? (
          <span> {`${data.cart.totalAmountCart} Items`}</span>
        ) : null}
      </header>
      <Cart
        data={data}
        addGlobalQuantity={addGlobalQuantity}
        removeItem={removeItem}
        subtractGlobalQuantity={subtractGlobalQuantity}
      />
    </>
  );
};
