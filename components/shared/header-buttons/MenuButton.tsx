'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './MenuButton.module.css';

const MenuButton = () => {
  return (
    <button className={styles.menuButton}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default MenuButton;
