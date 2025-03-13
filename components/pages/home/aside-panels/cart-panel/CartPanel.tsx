import styles from './CartPanel.module.css';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import { Button, Cart } from '@/components/shared';
import { CartPanelProps } from './types';
import { useCartPanel } from './useCartPanel';

export const CartPanel = ({
  actionElement,
  context,
  cartState,
  onDispatch,
  user,
  stateOpen,
  onSuccess,
  isPending,
}: CartPanelProps) => {
  const { addGlobalQuantity, onClick, removeItem, subtractGlobalQuantity } =
    useCartPanel({
      actionElement,
      context,
      onDispatch,
      onSuccess,
      stateOpen,
      cartState,
      user,
    });

  return (
    <>
      <header className={stylesAside.headerCart}>
        <span>Shopping cart</span>
        {cartState.cart.products.length ? (
          <span> {`${cartState.cart.totalAmountCart} Items`}</span>
        ) : null}
      </header>
      <div className={styles.container}>
        <Cart
          data={cartState}
          addGlobalQuantity={addGlobalQuantity}
          removeItem={removeItem}
          subtractGlobalQuantity={subtractGlobalQuantity}
        />
        <Button
          fullWidth={true}
          isLoading={isPending}
          onClick={onClick}
          label="Procced to checkout"
          disabled={!cartState.cart.products.length || isPending ? true : false}
          radius={2}
        />
      </div>
    </>
  );
};
