import styles from './PlaceOrder.module.css';
import { Button, ButtonGroup } from '@/components/shared';
import { PlaceOrderForm } from '../place-order-form';
import { PlaceOrderProps } from './types';

import {
  OrderAddress,
  OrderSummary,
  OrderProductsList,
} from '@/components/shared';

export const PlaceOrder = ({
  cartData,
  Controller,
  dataOrder,
  isPending,
  methods,
  onSubmit,
  state,
  methodsDelivery,
  methodsPayment,
  titleAddress,
  titleDelivery,
  titleOrders,
  titlePayment,
  titleSummary,
  textSubmit,
}: PlaceOrderProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <PlaceOrderForm
            Controller={Controller}
            methods={methods}
            methodsDelivery={methodsDelivery}
            methodsPayment={methodsPayment}
            onSubmit={onSubmit}
            state={state}
            titleDelivery={titleDelivery}
            titlePayment={titlePayment}
          />
          <OrderAddress dataOrder={dataOrder} titleAddress={titleAddress} />
          <OrderProductsList
            items={cartData?.products ?? []}
            titleOrders={titleOrders}
          />
        </div>
        <div className={styles.right}>
          <OrderSummary
            dataOrder={dataOrder}
            methodDelivery={methods.watch('methodDelivery')}
            methodPayment={methods.watch('methodPayment')}
            priceDelivery={methods.watch('priceDelivery')}
            timeDelivery={methods.watch('timeDelivery')}
            titleSummary={titleSummary}
            totalPrice={cartData?.totalPriceCart ?? 0}
          />
          <ButtonGroup fullWidth={true} marginTop={8}>
            <Button
              disabled={isPending}
              fullWidth={true}
              form="place-order-form"
              isLoading={isPending}
              label={textSubmit}
              radius={2}
              type="submit"
            />
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};
