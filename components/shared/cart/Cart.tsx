import styles from './Cart.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { CartItem } from '../cart-item';
import { CartProps } from './types';
import { classNames } from '@/helpers';

export const Cart = ({
  data,
  addGlobalQuantity,
  removeItem,
  subtractGlobalQuantity,
}: CartProps) => {
  return (
    <div className={styles.cart}>
      {data.cart.products.length
        ? data.cart.products.map((product) => (
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
        Total amount: {data.cart.totalAmountCart}
      </h4>
      <h4 className={styles.title}>Subtotal: {data.cart.totalPriceCart}€</h4>
      <Button
        className={classNames(
          stylesButton.buttonProccedCheckout,
          styles.button
        )}
        onClick={() => {
          console.log('Click procced to checkout');
        }}
        text="Procced to checkout"
        disabled={data.cart.products.length ? false : true}
      />
    </div>
  );
};
