'use client';
import styles from './MenuButton.module.css';
import { controlAside } from '@/helpers';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAside } from '@/store/aside';

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
