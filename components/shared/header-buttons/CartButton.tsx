'use client';
import styles from './CardButton.module.css';
import { controlAside } from '@/helpers';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAside } from '@/store/aside';

export const CartButton = () => {
  const context = useAside();
  const quatity = 0;

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
      {quatity ? (
        <span className={styles.quantity}>
          {quatity < 100 ? quatity : quatity - 1 + '+'}
        </span>
      ) : null}
    </button>
  );
};
