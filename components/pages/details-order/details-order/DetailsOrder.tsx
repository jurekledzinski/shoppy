import styles from './DetailsOrder.module.css';
import { DetailsOrderProps } from './types';
import { TermsConditionsForm } from '../terms-conditions-form';

import {
  OrderAddress,
  OrderSummary,
  OrderProductsList,
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

          <OrderProductsList
            items={cartData?.products ?? []}
            titleOrders={titleOrders}
          />
        </div>
        <div className={styles.right}>
          <OrderSummary
            dataOrder={dataOrder}
            methodDelivery={dataOrder?.methodDelivery ?? ''}
            methodPayment={dataOrder?.methodPayment ?? ''}
            priceDelivery={dataOrder?.priceDelivery ?? 0}
            timeDelivery={dataOrder?.timeDelivery ?? 0}
            titleSummary={titleSummary}
          />

          <TermsConditionsForm
            isPending={isPending}
            methods={methods}
            onSubmit={onSubmit}
            state={state}
            textSubmit="Checkout"
          />
        </div>
      </div>
    </>
  );
};
