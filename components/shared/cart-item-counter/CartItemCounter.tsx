import styles from './CartItemCounter.module.css';
import { Button } from '../button';
import { CartItemCounterProps } from './types';
import { classNames } from '@/helpers';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CartItemCounter = ({
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
}: CartItemCounterProps) => {
  return (
    <div className={classNames(styles.wrapper, className!)}>
      <Button
        className={classNames(styles.buttonMinus, classNameMinus!)}
        onClick={() => {
          if (!subtractGlobalQuantity) return;
          if (!subtractLocalQuantity) return;
          if (localQuantity) subtractLocalQuantity();
          else subtractGlobalQuantity();
        }}
        text={<FontAwesomeIcon icon={faMinus} />}
        disabled={localQuantity ? quanity === 1 : false}
      />
      <p className={classNames(styles.input, classNameInput!)}>{quanity}</p>
      <Button
        className={classNames(styles.buttonPlus, classNamePlus!)}
        onClick={() => {
          if (!addGlobalQuantity) return;
          if (!addLocalQuantity) return;
          if (localQuantity) addLocalQuantity();
          else addGlobalQuantity();
        }}
        text={<FontAwesomeIcon icon={faPlus} />}
        disabled={localQuantity ? quanity === onStock : false}
      />
    </div>
  );
};
