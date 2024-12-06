import styles from './Cart.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { CartItem } from '../cart-item';
import { CartProps } from './types';
import { classNames } from '@/helpers';
import { useCart } from '@/store/cart';

export const Cart = ({}: CartProps) => {
  const { dispatch, state } = useCart();

  const addGlobalQuantity = (id: string) => {
    dispatch({ type: 'INCREASE_ITEM', payload: { id } });
  };
  const subtractGlobalQuantity = (id: string) => {
    dispatch({ type: 'SUBTRACT_ITEM', payload: { id } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  return (
    <div className={styles.cart}>
      {state.cart.products.length
        ? state.cart.products.map((product) => (
            <CartItem
              key={product._id ?? ''}
              data={product}
              addGlobalQuantity={addGlobalQuantity}
              removeItem={removeItem}
              subtractGlobalQuantity={subtractGlobalQuantity}
              disabledButtonMinus={product.quantity === 1}
              disabledButtonPlus={product.onStock <= product.quantity}
            />
          ))
        : null}

      <h4 className={styles.title}>
        Total amount: {state.cart.totalAmountCart}
      </h4>
      <h4 className={styles.title}>Subtotal: {state.cart.totalPriceCart}€</h4>
      <Button
        className={classNames(
          stylesButton.buttonProccedCheckout,
          styles.button
        )}
        onClick={() => {
          console.log('Click procced to checkout');
        }}
        text="Procced to checkout"
        disabled={state.cart.products.length ? false : true}
      />
    </div>
  );
};
