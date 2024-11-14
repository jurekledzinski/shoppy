'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import styles from './CardButton.module.css';

const CartButton = () => {
  return (
    <button className={styles.cartButton}>
      <FontAwesomeIcon icon={faCartShopping} />
    </button>
  );
};

export default CartButton;
