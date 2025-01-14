import styles from './PlaceOrder.module.css';
import stylesButton from '@styles/buttons.module.css';
import { PlaceOrderForm } from '../place-order-form';
import { PlaceOrderProps } from './types';

import {
  Button,
  Loader,
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

          <Button
            className={stylesButton.buttonConfirmFullWidth}
            disabled={isPending}
            form="place-order-form"
            type="submit"
            text={textSubmit}
          >
            {isPending && <Loader />}
          </Button>
        </div>
      </div>
    </>
  );
};
