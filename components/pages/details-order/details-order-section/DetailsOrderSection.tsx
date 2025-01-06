'use client';
import styles from './DetailsOrderSection.module.css';
import { checkout } from '@/actions';
import { DetailsOrder } from '../details-order/DetailsOrder';
import { DetailsOrderSectionProps } from './types';
import { showToast } from '@/helpers';
import { useActionState } from 'react';
import { useTermsConditionsForm } from '@/hooks';
import { loadStripe } from '@stripe/stripe-js';

export const DetailsOrderSection = ({
  cartData,
  children,
  orderData,
}: DetailsOrderSectionProps) => {
  const [state, formAction, isPending] = useActionState(checkout, {
    message: '',
    success: false,
  });

  const { methodsCheckoutOrder, onSubmitCheckoutOrder } =
    useTermsConditionsForm({
      cartData,
      defaultData: orderData,
      formAction,
      isPending,
      isSuccess: state.success,
      onSuccess: async () => {
        showToast(state.message);
        const stripePromise = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );
        await stripePromise?.redirectToCheckout({
          sessionId: state.payload?.id ?? '',
        });
      },
    });

  return (
    <section className={styles.section}>
      {children}
      <DetailsOrder
        cartData={cartData}
        dataOrder={orderData}
        isPending={isPending}
        methods={methodsCheckoutOrder}
        onSubmit={onSubmitCheckoutOrder}
        state={state}
        titleAddress="Shipping address"
        titlePayment="Method payment"
        titleDelivery="Method delivery"
        titleOrders="Your orders"
        titleSummary="Summary"
      />
    </section>
  );
};
