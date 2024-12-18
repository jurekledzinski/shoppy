import stylesAside from '@/components/shared/aside/Aside.module.css';
import stylesButton from '@styles/buttons.module.css';
import styles from './CartPanel.module.css';
import { Button } from '@/components/shared';
import { Cart } from '@/components/shared';
import { CartPanelProps } from './types';
import { classNames } from '@/helpers';

export const CartPanel = ({
  addGlobalQuantity,
  data,
  removeItem,
  subtractGlobalQuantity,
  onClick,
}: CartPanelProps) => {
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
          disabled={data.cart.products.length ? false : true}
        />
      </div>
    </>
  );
};
