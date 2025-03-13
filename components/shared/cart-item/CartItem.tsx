import Image from 'next/image';
import styles from './CartItem.module.css';
import { Button } from '../button';
import { CartItemCounter } from '../cart-item-counter';
import { CartItemProps } from './types';

export const CartItem = ({
  data,
  addGlobalQuantity,
  subtractGlobalQuantity,
  removeItem,
  disabledButtonMinus,
  disabledButtonPlus,
}: CartItemProps) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h6 className={styles.title}>Product</h6>
          <p className={styles.text}>{data.name}</p>
        </header>

        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <Image
              className={styles.image}
              src={data.image}
              width={200}
              height={200}
              alt={data.name}
            />
          </div>
          <div className={styles.contentRight}>
            <div>
              <h6 className={styles.title}>Price</h6>
              <p className={styles.text}>{data.price}€</p>
              <h6 className={styles.title}>Total</h6>
              <p className={styles.text}>{data.quantity * data.price}€</p>
            </div>
            <div>
              <h6 className={styles.title}>Quantity</h6>
              <CartItemCounter
                quanity={data.quantity}
                idProduct={data._id}
                localQuantity={false}
                addGlobalQuantity={addGlobalQuantity}
                subtractGlobalQuantity={subtractGlobalQuantity}
                disabledButtonMinus={disabledButtonMinus}
                disabledButtonPlus={disabledButtonPlus}
              />
            </div>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <Button
          fullWidth={true}
          onClick={() => {
            if (!data._id) return;
            removeItem(data._id);
          }}
          label="Remove item"
        />
      </footer>
    </div>
  );
};
