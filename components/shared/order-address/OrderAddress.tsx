import { OrderAddressProps } from './types';

export const OrderAddress = ({
  dataOrder,
  titleAddress,
}: OrderAddressProps) => {
  return (
    <>
      <h5>{titleAddress}</h5>
      <p>
        {dataOrder?.name} {dataOrder?.surname}
      </p>
      <p>{dataOrder?.street}</p>
      <p>
        {dataOrder?.postCode} {dataOrder?.city}
      </p>
      <p>{dataOrder?.country}</p>
    </>
  );
};
