import styles from './CartItemCounter.module.css';
import { CartItemCounterProps } from './types';
import { classNames } from '@/helpers';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '../icon-button/IconButton';

export const CartItemCounter = ({
  idProduct,
  className,
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
      <IconButton
        color="primary"
        disabled={disabledButtonMinus}
        icon={faMinus}
        onClick={() => {
          if (localQuantity && subtractLocalQuantity) subtractLocalQuantity();
          if (!localQuantity && subtractGlobalQuantity && idProduct) {
            subtractGlobalQuantity(idProduct);
          }
        }}
        variant="contained"
      />
      <p
        className={classNames(
          styles.input,
          disabledButtonMinus && disabledButtonPlus ? styles['disabled'] : ''
        )}
      >
        {quanity}
      </p>
      <IconButton
        color="primary"
        disabled={disabledButtonPlus}
        icon={faPlus}
        onClick={() => {
          if (localQuantity && addLocalQuantity) addLocalQuantity();
          if (!localQuantity && addGlobalQuantity && idProduct) {
            addGlobalQuantity(idProduct);
          }
        }}
        variant="contained"
      />
    </div>
  );
};
