import styles from './DetailsOrder.module.css';
import { DetailsOrderProps } from './types';
import { TermsConditionsForm } from '../terms-conditions-form';

import {
  OrderAddress,
  OrderSummary,
  OrderProductsList,
  AlertError,
} from '@/components/shared';

export const DetailsOrder = ({
  cartData,
  dataOrder,
  isPending,
  methods,
  onSubmit,
  state,
  titleAddress,
  titleDelivery,
  titleOrders,
  titlePayment,
  titleSummary,
}: DetailsOrderProps) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <h5>{titlePayment}</h5>
          <p>{dataOrder?.methodPayment}</p>

          <h5>{titleDelivery}</h5>
          <p>
            {dataOrder?.methodDelivery} {dataOrder?.priceDelivery}€
          </p>

          <OrderAddress dataOrder={dataOrder} titleAddress={titleAddress} />

          <h5>{titleOrders}</h5>
          <OrderProductsList items={cartData?.products ?? []} />
        </div>
        <div className={styles.right}>
          <OrderSummary
            dataOrder={dataOrder}
            methodDelivery={dataOrder?.methodDelivery ?? ''}
            methodPayment={dataOrder?.methodPayment ?? ''}
            priceDelivery={dataOrder?.priceDelivery ?? 0}
            timeDelivery={dataOrder?.timeDelivery ?? 0}
            titleSummary={titleSummary}
            totalPrice={cartData?.totalPriceCart ?? 0}
          />

          <TermsConditionsForm
            isEmpty={!Boolean(cartData?.products.length)}
            isPending={isPending}
            methods={methods}
            onSubmit={onSubmit}
            state={state}
            textSubmit="Checkout"
          />

          {cartData && !Boolean(cartData.products.length) && (
            <AlertError>
              Your shopping cart is empty, please add products.
            </AlertError>
          )}
        </div>
      </div>
    </>
  );
};
