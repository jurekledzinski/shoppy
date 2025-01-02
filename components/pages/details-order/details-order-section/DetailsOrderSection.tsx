'use client';
import styles from './DetailsOrderSection.module.css';
import { checkout } from '@/actions';
import { DetailsOrder } from '../details-order/DetailsOrder';
import { DetailsOrderSectionProps } from './types';
import { showToast } from '@/helpers';
import { useActionState } from 'react';
import { useTermsConditionsForm } from '@/hooks';

export const DetailsOrderSection = ({
  children,
  orderData,
}: DetailsOrderSectionProps) => {
  const [stateCheckoutOrder, formActionCheckoutOrder, isPendingCheckoutOrder] =
    useActionState(checkout, {
      message: '',
      success: false,
    });

  const { methodsCheckoutOrder, onSubmitCheckoutOrder } =
    useTermsConditionsForm({
      defaultData: orderData,
      formAction: formActionCheckoutOrder,
      isPending: isPendingCheckoutOrder,
      isSuccess: stateCheckoutOrder.success,
      onSuccess: () => {
        showToast(stateCheckoutOrder.message);
      },
    });

  return (
    <section className={styles.section}>
      {children}
      <DetailsOrder
        dataOrder={orderData}
        isPending={isPendingCheckoutOrder}
        methods={methodsCheckoutOrder}
        onSubmit={onSubmitCheckoutOrder}
        state={stateCheckoutOrder}
        titleAddress="Shipping address"
        titlePayment="Method payment"
        titleDelivery="Method delivery"
        titleOrders="Your orders"
        titleSummary="Summary"
      />
    </section>
  );
};
