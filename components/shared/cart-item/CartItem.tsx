import { CartItemCounter } from '../cart-item-counter';
import styles from './CartItem.module.css';
import { CartItemProps } from './types';
import Image from 'next/image';
import { Button } from '../button';
import stylesButton from '@styles/buttons.module.css';
import { classNames } from '@/helpers';

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
                classNameIcon={styles.icon}
                classNameInput={styles.input}
                classNameMinus={styles.buttonMinus}
                classNamePlus={styles.buttonPlus}
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
          className={classNames(
            stylesButton.buttonRemoveItem,
            styles.buttonRemoveItem
          )}
          onClick={() => {
            if (!data._id) return;
            removeItem(data._id);
          }}
          text="Remove item"
        />
      </footer>
    </div>
  );
};
