import styles from './Cart.module.css';
import { CartItem } from '../cart-item';
import { CartProps } from './types';

export const Cart = ({
  data,
  addGlobalQuantity,
  removeItem,
  subtractGlobalQuantity,
}: CartProps) => {
  return (
    <div className={styles.cart}>
      {data.cart.products.length ? (
        data.cart.products.map((product) => (
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
      ) : (
        <div className={styles.wrapper}>
          <h6 className={styles.text}>Cart is empty</h6>
        </div>
      )}
      <h4 className={styles.title}>
        Total amount: {data.cart.totalAmountCart}
      </h4>
      <h4 className={styles.title}>Subtotal: {data.cart.totalPriceCart}€</h4>
    </div>
  );
};
