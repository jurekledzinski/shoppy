import { OrderAddressProps } from './types';

export const OrderAddress = ({ className, ordersData }: OrderAddressProps) => {
  return (
    <>
      <h4 className={className.title}>Address:</h4>
      <ul className={className.list}>
        <li>
          Name: {ordersData.name} {ordersData.surname}
        </li>
        <li>Street: {ordersData.street}</li>
        <li>Postcode: {ordersData.postCode}</li>
        <li>City: {ordersData.city}</li>
        <li>Country: {ordersData.country}</li>
      </ul>
    </>
  );
};
