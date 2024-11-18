'use client';
import styles from './CardButton.module.css';
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

        if (actionElement === 'menu' && stateOpen) {
          context.onChange('menu', !stateOpen);

          const idTimeout = setTimeout(() => {
            context.onChange('cart', true);

            clearTimeout(idTimeout);
          }, 1000);

          return;
        }

        context.onChange('cart', !stateOpen);
      }}
    >
      <FontAwesomeIcon icon={faCartShopping} />
    </button>
  );
};
