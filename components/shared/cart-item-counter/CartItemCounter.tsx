import styles from './CartItemCounter.module.css';
import { Button } from '../button';
import { CartItemCounterProps } from './types';
import { classNames } from '@/helpers';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItemCounter = ({
  idProduct,
  classNameInput,
  classNameIcon,
  className,
  classNameMinus,
  classNamePlus,
  addGlobalQuantity,
  addLocalQuantity,
  subtractGlobalQuantity,
  subtractLocalQuantity,
  quanity,
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
        disabled={disabledButtonMinus}
      >
        <span className={classNames(styles.icon, classNameIcon!)}>
          <FontAwesomeIcon icon={faMinus} />
        </span>
      </Button>

      <p className={classNames(styles.input, classNameInput!)}>{quanity}</p>

      <Button
        className={classNames(styles.buttonPlus, classNamePlus!)}
        onClick={() => {
          if (localQuantity && addLocalQuantity) addLocalQuantity();
          if (!localQuantity && addGlobalQuantity && idProduct) {
            addGlobalQuantity(idProduct);
          }
        }}
        disabled={disabledButtonPlus}
      >
        <span className={classNames(styles.icon, classNameIcon!)}>
          <FontAwesomeIcon icon={faPlus} />
        </span>
      </Button>
    </div>
  );
};
