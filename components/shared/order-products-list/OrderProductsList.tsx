import Image from 'next/image';
import { OrderProductsListProps } from './types';
import styles from './OrderProductsList.module.css';

export const OrderProductsList = ({ items }: OrderProductsListProps) => {
  return (
    <div>
      <ul>
        {items.map((product) => (
          <li className={styles.item} key={product._id}>
            <span>
              <Image
                className={styles.image}
                src={product.image}
                width={35}
                height={35}
                alt={product.name}
                priority={true}
              />
            </span>
            <ul className={styles.list}>
              <li>{product.name}</li>
              <li>Quantity: {product.quantity}</li>
              <li>Price: {product.price}€</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
