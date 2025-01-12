import Image from 'next/image';
import { OrderProductsListProps } from './types';
import styles from './OrderProductsList.module.css';

export const OrderProductsList = ({
  items,
  titleOrders,
}: OrderProductsListProps) => {
  return (
    <div>
      <h4 className={styles.title}>{titleOrders}</h4>
      <ul>
        {items.map((product) => (
          <li className={styles.item} key={product._id}>
            <span>
              <Image
                className={styles.image}
                src={product.image}
                width={100}
                height={100}
                alt={product.name}
                priority={true}
              />
            </span>
            <ul className={styles.list}>
              <li className={styles.text}>{product.name}</li>
              <li className={styles.text}>Quantity: {product.quantity}</li>
              <li className={styles.text}>Price: {product.price}€</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
