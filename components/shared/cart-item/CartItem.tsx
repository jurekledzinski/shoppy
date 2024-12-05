import { CartItemCounter } from '../cart-item-counter';
import styles from './CartItem.module.css';
import { CartItemProps } from './types';
import Image from 'next/image';
import { Button } from '../button';

export const CartItem = ({
  data,
  addGlobalQuantity,
  subtractGlobalQuantity,
  removeItem,
}: CartItemProps) => {
  console.log('data', data);
  return (
    <div className={styles.cartItem}>
      <header>
        <h6 className={styles.title}>Product</h6>
        <p className={styles.text}>Samsugn galaxy J7 (2016)</p>
      </header>
      <div className={styles.content}>
        <div className={styles.contentLeft}>
          <Image
            className={styles.image}
            src={''}
            width={200}
            height={200}
            alt={'image phone'}
          />
        </div>
        <div className={styles.contentRight}>
          <h6 className={styles.title}>Price</h6>
          <p className={styles.text}>140€</p>{' '}
          <h6 className={styles.title}>Total</h6>
          <p className={styles.text}>840€</p>
          <h6 className={styles.title}>Quantity</h6>
          <CartItemCounter
            quanity={1}
            localQuantity={false}
            onStock={10}
            addGlobalQuantity={addGlobalQuantity}
            subtractGlobalQuantity={subtractGlobalQuantity}
          />
        </div>
      </div>
      <footer className={styles.footer}>
        <Button onClick={() => removeItem('id')} text="Remove item" />
      </footer>
    </div>
  );
};
