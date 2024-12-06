import styles from './CartItemCounter.module.css';
import { Button } from '../button';
import { CartItemCounterProps } from './types';
import { classNames } from '@/helpers';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItemCounter = ({
  idProduct,
  classNameInput,
  className,
  classNameMinus,
  classNamePlus,
  addGlobalQuantity,
  addLocalQuantity,
  subtractGlobalQuantity,
  subtractLocalQuantity,
  quanity,
  onStock,
  localQuantity = true,
  disabledButtonMinus,
  disabledButtonPlus,
}: CartItemCounterProps) => {
  return (
    <div className={classNames(styles.wrapper, className!)}>
      <Button
        className={classNames(styles.buttonMinus, classNameMinus!)}
        onClick={() => {
          if (localQuantity && subtractLocalQuantity) subtractLocalQuantity();
          if (!localQuantity && subtractGlobalQuantity && idProduct) {
            subtractGlobalQuantity(idProduct);
          }
        }}
        text={<FontAwesomeIcon icon={faMinus} />}
        disabled={disabledButtonMinus}
      />

      <p className={classNames(styles.input, classNameInput!)}>{quanity}</p>

      <Button
        className={classNames(styles.buttonPlus, classNamePlus!)}
        onClick={() => {
          if (localQuantity && addLocalQuantity) addLocalQuantity();
          if (!localQuantity && addGlobalQuantity && idProduct) {
            addGlobalQuantity(idProduct);
          }
        }}
        text={<FontAwesomeIcon icon={faPlus} />}
        disabled={disabledButtonPlus}
      />
    </div>
  );
};
