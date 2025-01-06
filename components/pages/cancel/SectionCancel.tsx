'use client';
import styles from './SectionCancel.module.css';
import stylesButton from '@styles/buttons.module.css';
import { AlertError, Button, CrossIcon, Loader } from '@/components/shared';
import { cancelOrder, noCancelOrder } from '@/actions';
import { SectionCancelProps } from './types';
import { startTransition, useActionState } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

export const SectionCancel = ({ orderId }: SectionCancelProps) => {
  const router = useRouter();
  const { dispatch } = useCart();

  const [stateCancelOrder, formActionCancelOrder, isPendingCancelOrder] =
    useActionState(cancelOrder, {
      message: '',
      success: false,
    });

  const [stateNoCancelOrder, formActionNoCancelOrder, isPendingNoCancelOrder] =
    useActionState(noCancelOrder, {
      message: '',
      success: false,
    });

  return (
    <section className={styles.section}>
      <h4 className={styles.title}>Your order has been canceled!</h4>
      <CrossIcon />
      <h4 className={styles.title}>
        You have canceled your order. Would you like to continue previous
        shopping?
      </h4>
      <div className={styles.buttonGroup}>
        <Button
          className={stylesButton.buttonConfirm}
          disabled={isPendingNoCancelOrder}
          text="Yes, I want to continue"
          onClick={() => {
            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionNoCancelOrder(formData));

            router.replace('/');
          }}
        >
          {isPendingNoCancelOrder && <Loader />}
        </Button>

        <Button
          className={stylesButton.buttonConfirm}
          disabled={isPendingCancelOrder}
          text="No, I don't want to continue"
          onClick={() => {
            dispatch({ type: 'CLEAR_CART' });

            const formData = new FormData();
            formData.set('orderId', orderId);
            startTransition(() => formActionCancelOrder(formData));

            router.replace('/');
          }}
        >
          {isPendingCancelOrder && <Loader />}
        </Button>
      </div>

      {!stateCancelOrder.success && stateCancelOrder.message && (
        <AlertError>{stateCancelOrder.message}</AlertError>
      )}

      {!stateNoCancelOrder.success && stateNoCancelOrder.message && (
        <AlertError>{stateNoCancelOrder.message}</AlertError>
      )}
    </section>
  );
};
