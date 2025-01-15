'use client';
import styles from './CardButton.module.css';
import { controlAside } from '@/helpers';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';

export const CartButton = () => {
  const context = useAside();
  const { state } = useCart();

  return (
    <button
      className={styles.cartButton}
      onClick={() => {
        const actionElement = context.type;
        const stateOpen = context.value;
        controlAside(context, 'cart', actionElement, stateOpen);
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} />
      {state.cart && state.cart.products.length ? (
        <span className={styles.quantity}>
          {state.cart.totalAmountCart < 100
            ? state.cart.totalAmountCart
            : state.cart.totalAmountCart - 1 + '+'}
        </span>
      ) : null}
    </button>
  );
};
