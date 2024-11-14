'use client';
import { useAside } from '@/store/aside';
import styles from './MenuButton.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MenuButton = () => {
  const context = useAside();

  return (
    <button
      className={styles.menuButton}
      onClick={() => {
        const actionElement = context.type;
        const stateOpen = context.value;
        if (actionElement === 'cart' && stateOpen) {
          context.onChange('cart', !stateOpen);

          const idTimeout = setTimeout(() => {
            context.onChange('menu', true);
            clearTimeout(idTimeout);
          }, 1000);

          return;
        }

        context.onChange('menu', !stateOpen);
      }}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default MenuButton;
