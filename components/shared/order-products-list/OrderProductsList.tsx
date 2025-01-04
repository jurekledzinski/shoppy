import { OrderProductsListProps } from './types';

export const OrderProductsList = ({
  items,
  titleOrders,
}: OrderProductsListProps) => {
  return (
    <div>
      <h5>{titleOrders}</h5>
      <ul>
        {items.map((product) => (
          <li key={product._id}>
            <span>{product.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
