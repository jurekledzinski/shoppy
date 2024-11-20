'use client';
import { useAside } from '@/store/aside';
import styles from './MenuButton.module.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { controlAside } from '@/helpers';

export const MenuButton = () => {
  const context = useAside();

  return (
    <button
      className={styles.menuButton}
      onClick={() => {
        const actionElement = context.type;
        const stateOpen = context.value;
        controlAside(context, 'menu', actionElement, stateOpen);
      }}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};
