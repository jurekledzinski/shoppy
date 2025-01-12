import styles from './DetailsOrder.module.css';
import stylesAlert from '@/components/shared/alert/Alert.module.css';
import { DetailsOrderProps } from './types';
import { TermsConditionsForm } from '../terms-conditions-form';
import { formatText } from '@/helpers';

import {
  OrderAddress,
  OrderSummary,
  OrderProductsList,
  Alert,
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
          <h4 className={styles.title}>{titlePayment}</h4>
          <p className={styles.text}>
            {formatText(dataOrder?.methodPayment ?? '')}
          </p>

          <h4 className={styles.title}>{titleDelivery}</h4>
          <p className={styles.text}>
            {formatText(dataOrder?.methodDelivery ?? '')}{' '}
            {dataOrder?.priceDelivery}€
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
            <Alert className={stylesAlert.warning}>
              Your shopping cart is empty, please add products.
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};
