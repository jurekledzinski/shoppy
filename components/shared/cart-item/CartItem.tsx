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
}: CartItemProps) => {
  console.log('data', data);
  return (
    <div className={styles.cartItem}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <h6 className={styles.title}>Product</h6>
          <p className={styles.text}>Samsugn galaxy J7 (2016)</p>
        </header>
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            <Image
              className={styles.image}
              src={
                'https://ik.imagekit.io/mdklwracd5rti/Shoppy/Phones/Samsung/Samsung-galaxy-a51-front_gpioTOu6b.png'
              }
              width={200}
              height={200}
              alt={'image phone'}
            />
          </div>
          <div className={styles.contentRight}>
            <div>
              <h6 className={styles.title}>Price</h6>
              <p className={styles.text}>140€</p>{' '}
              <h6 className={styles.title}>Total</h6>
              <p className={styles.text}>840€</p>
            </div>
            <div>
              <h6 className={styles.title}>Quantity</h6>
              <CartItemCounter
                classNameInput={styles.input}
                classNameMinus={styles.buttonMinus}
                classNamePlus={styles.buttonPlus}
                quanity={1}
                localQuantity={false}
                onStock={10}
                addGlobalQuantity={addGlobalQuantity}
                subtractGlobalQuantity={subtractGlobalQuantity}
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
          onClick={() => removeItem('id')}
          text="Remove item"
        />
      </footer>
    </div>
  );
};
