'use client';
import styles from './CartItemCounter.module.css';
import { Button } from '../button';
import { CartItemCounterProps } from './types';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItemCounter = ({
  className,

  addGlobalQuantity,
  addLocalQuantity,
  subtractGlobalQuantity,
  subtractLocalQuantity,
  quanity,
  onStock,
  localQuantity = true,
}: CartItemCounterProps) => {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <Button
        className={styles.buttonMinus}
        onClick={() => {
          if (localQuantity) subtractLocalQuantity();
          else subtractGlobalQuantity();
        }}
        text={<FontAwesomeIcon icon={faMinus} />}
        disabled={localQuantity ? quanity === 1 : false}
      />
      <input
        className={styles.input}
        type="text"
        readOnly={true}
        value={quanity}
      />
      <Button
        className={styles.buttonPlus}
        onClick={() => {
          if (localQuantity) addLocalQuantity();
          else addGlobalQuantity();
        }}
        text={<FontAwesomeIcon icon={faPlus} />}
        disabled={localQuantity ? quanity === onStock : false}
      />
    </div>
  );
};
