import { CartItem } from '../cart-item';
import styles from './Cart.module.css';
import { CartProps } from './types';

export const Cart = ({ data }: CartProps) => {
  console.log('Cart data', data);
  return (
    <div className={styles.cart}>
      <CartItem
        data={[]}
        addGlobalQuantity={() => {}}
        removeItem={() => {}}
        subtractGlobalQuantity={() => {}}
        key={'1'}
      />
    </div>
  );
};
