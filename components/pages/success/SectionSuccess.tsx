'use client';
import styles from './SectionSuccess.module.css';
import stylesButton from '@styles/buttons.module.css';
import { AlertError, Button, TickIcon } from '@/components/shared';
import { successOrder } from '@/actions';
import { SectionSuccessProps } from './type';
import { startTransition, useActionState, useEffect } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

export const SectionSuccess = ({ cartData, orderId }: SectionSuccessProps) => {
  const router = useRouter();
  const { dispatch } = useCart();
  const [state, formAction, isPending] = useActionState(successOrder, {
    message: '',
    success: false,
  });

  useEffect(() => {
    dispatch({ type: 'CLEAR_CART' });

    if (!cartData) return;
    const formData = new FormData();
    formData.set('cart', JSON.stringify(cartData));
    formData.set('orderId', orderId);

    startTransition(() => formAction(formData));
  }, [cartData, dispatch, formAction, orderId]);

  return (
    <section className={styles.section}>
      <h4 className={styles.title}>Thank you for your purchase!</h4>
      <TickIcon />
      <Button
        className={stylesButton.buttonConfirm}
        disabled={isPending}
        text="Go to home page"
        onClick={() => router.replace('/')}
      />
      {!state.success && state.message && (
        <AlertError>{state.message}</AlertError>
      )}
    </section>
  );
};
