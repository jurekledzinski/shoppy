'use client';
import styles from './SectionSuccess.module.css';
import stylesButton from '@styles/buttons.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { AlertError, Button, Section, TickIcon } from '@/components/shared';
import { successOrder } from '@/actions';
import { SectionSuccessProps } from './type';
import { startTransition, useActionState, useCallback, useEffect } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

export const SectionSuccess = ({
  isGuestLogin,
  isStepperLogin,
  isUserLogIn,
  orderId,
}: SectionSuccessProps) => {
  const router = useRouter();
  const { dispatch, state: stateCart } = useCart();

  const [state, formAction, isPending] = useActionState(successOrder, {
    message: '',
    success: false,
  });

  const handelSuccessOrder = useCallback(() => {
    if (!stateCart.cart.products.length) return;

    const formData = new FormData();
    formData.set('cart', JSON.stringify(stateCart.cart));
    formData.set('orderId', orderId);

    dispatch({ type: 'CLEAR_CART' });
    startTransition(() => formAction(formData));
  }, [dispatch, formAction, orderId, stateCart]);

  useEffect(() => {
    if (!isUserLogIn && isGuestLogin && isStepperLogin) {
      handelSuccessOrder();
    }

    if (!isGuestLogin && isUserLogIn && isStepperLogin) {
      handelSuccessOrder();
    }
  }, [handelSuccessOrder, isUserLogIn, isGuestLogin, isStepperLogin]);

  return (
    <Section className={stylesSection.sectionCentered}>
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
    </Section>
  );
};
