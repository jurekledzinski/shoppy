'use client';
import styles from './CardButton.module.css';
import { controlAside } from '@/helpers';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAside } from '@/store/aside';

export const CartButton = () => {
  const context = useAside();

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
    </button>
  );
};
