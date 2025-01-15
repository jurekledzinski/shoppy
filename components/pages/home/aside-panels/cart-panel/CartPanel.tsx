import styles from './CartPanel.module.css';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button, Loader } from '@/components/shared';
import { Cart } from '@/components/shared';
import { CartPanelProps } from './types';
import { classNames } from '@/helpers';
import { useCartPanel } from './useCartPanel';

export const CartPanel = ({
  actionElement,
  context,
  data,
  dispatch,
  userId,
  userName,
  guestId,
  stateOpen,
  onSuccess,
  state,
  isPending,
}: CartPanelProps) => {
  const { addGlobalQuantity, onClick, removeItem, subtractGlobalQuantity } =
    useCartPanel({
      actionElement,
      context,
      dispatch,
      guestId,
      onSuccess,
      stateOpen,
      userId,
      userName,
      state,
    });

  return (
    <>
      <header className={stylesAside.headerCart}>
        <span>Shopping cart</span>
        {data.cart.products.length ? (
          <span> {`${data.cart.totalAmountCart} Items`}</span>
        ) : null}
      </header>
      <div className={styles.container}>
        <Cart
          data={data}
          addGlobalQuantity={addGlobalQuantity}
          removeItem={removeItem}
          subtractGlobalQuantity={subtractGlobalQuantity}
        />
        <Button
          className={classNames(stylesButton.buttonConfirmFullWidth)}
          onClick={onClick}
          text="Procced to checkout"
          disabled={!data.cart.products.length || isPending ? true : false}
        >
          {isPending && <Loader />}
        </Button>
      </div>
    </>
  );
};
