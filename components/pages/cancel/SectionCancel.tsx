'use client';
import styles from './SectionCancel.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { Alert, Button, Icon, Section } from '@/components/shared';
import { cancelOrder, noCancelOrder } from '@/actions';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SectionCancelProps } from './types';
import { startTransition, useActionState, useEffect } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

export const SectionCancel = ({ orderId }: SectionCancelProps) => {
  const router = useRouter();
  const { dispatch, state } = useCart();

  const [stateCancelOrder, formActionCancelOrder, isPendingCancelOrder] =
    useActionState(cancelOrder, {
      message: '',
      success: false,
    });

  useEffect(() => {
    if (stateCancelOrder.success && !isPendingCancelOrder) {
      router.replace('/');
    }
  }, [isPendingCancelOrder, stateCancelOrder.success, router]);

  const [stateNoCancelOrder, formActionNoCancelOrder, isPendingNoCancelOrder] =
    useActionState(noCancelOrder, {
      message: '',
      success: false,
    });

  useEffect(() => {
    if (stateNoCancelOrder.success && !isPendingNoCancelOrder) {
      router.replace('/');
    }
  }, [isPendingNoCancelOrder, stateNoCancelOrder.success, router]);

  return (
    <Section className={stylesSection.sectionCentered}>
      <h4 className={styles.title}>Your order has been canceled!</h4>
      <Icon icon={faCircleXmark} size="2x" color="negative" />
      <p className={styles.text}>
        Would you like to continue previous shopping?
      </p>
      <div className={styles.buttonGroup}>
        <Button
          disabled={
            isPendingCancelOrder ||
            isPendingNoCancelOrder ||
            !state.cart.totalAmountCart
          }
          isLoading={isPendingCancelOrder}
          label="No"
          onClick={() => {
            dispatch({ type: 'CLEAR_CART' });
            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionCancelOrder(formData));
          }}
          radius={2}
        />
        <Button
          disabled={
            isPendingNoCancelOrder ||
            isPendingCancelOrder ||
            !state.cart.totalAmountCart
          }
          isLoading={isPendingNoCancelOrder}
          label="Yes"
          onClick={() => {
            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionNoCancelOrder(formData));
          }}
          radius={2}
        />
      </div>

      {!stateCancelOrder.success && stateCancelOrder.message && (
        <Alert marginTop={8} color="negative">
          {stateCancelOrder.message}
        </Alert>
      )}

      {!stateNoCancelOrder.success && stateNoCancelOrder.message && (
        <Alert marginTop={8} color="negative">
          {stateNoCancelOrder.message}
        </Alert>
      )}
    </Section>
  );
};
