'use client';
import styles from './SectionCancel.module.css';
import stylesButton from '@styles/buttons.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { cancelOrder, noCancelOrder } from '@/actions';
import { SectionCancelProps } from './types';
import { startTransition, useActionState, useEffect } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

import { Alert, Button, CrossIcon, Loader, Section } from '@/components/shared';

export const SectionCancel = ({ orderId }: SectionCancelProps) => {
  const router = useRouter();
  const { dispatch } = useCart();

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
      <CrossIcon />
      <h4 className={styles.title}>
        You have canceled your order. Would you like to continue previous
        shopping?
      </h4>
      <div className={styles.buttonGroup}>
        <Button
          className={stylesButton.buttonConfirm}
          disabled={isPendingNoCancelOrder || isPendingCancelOrder}
          text="Yes, I want to continue"
          onClick={() => {
            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionNoCancelOrder(formData));
          }}
        >
          {isPendingNoCancelOrder && <Loader />}
        </Button>

        <Button
          className={stylesButton.buttonConfirm}
          disabled={isPendingCancelOrder || isPendingNoCancelOrder}
          text="No, I don't want to continue"
          onClick={() => {
            dispatch({ type: 'CLEAR_CART' });

            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionCancelOrder(formData));
          }}
        >
          {isPendingCancelOrder && <Loader />}
        </Button>
      </div>

      {!stateCancelOrder.success && stateCancelOrder.message && (
        <Alert>{stateCancelOrder.message}</Alert>
      )}

      {!stateNoCancelOrder.success && stateNoCancelOrder.message && (
        <Alert>{stateNoCancelOrder.message}</Alert>
      )}
    </Section>
  );
};
