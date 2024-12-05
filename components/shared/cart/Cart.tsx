import styles from './Cart.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Button } from '../button';
import { CartItem } from '../cart-item';
import { CartProps } from './types';
import { classNames } from '@/helpers';

export const Cart = ({ data }: CartProps) => {
  console.log('Cart data', data);
  return (
    <div className={styles.cart}>
      <CartItem
        data={[]}
        addGlobalQuantity={() => {}}
        removeItem={() => {}}
        subtractGlobalQuantity={() => {}}
      />
      <h4 className={styles.title}>Subtotal: 560€</h4>
      <Button
        className={classNames(stylesButton.buttonRemoveItem, styles.button)}
        onClick={() => {}}
        text="Procced to checkout"
      />
    </div>
  );
};
