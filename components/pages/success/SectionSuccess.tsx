'use client';
import styles from './SectionSuccess.module.css';
import stylesSection from '@/components/shared/section/Section.module.css';
import { Alert, Button, Icon, Section } from '@/components/shared';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { SectionSuccessProps } from './type';
import { startTransition, useActionState, useCallback, useEffect } from 'react';
import { successOrder } from '@/actions';
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
      <Icon icon={faCircleCheck} size="2x" color="success" />
      <Button
        disabled={isPending}
        label="Go to home page"
        onClick={() => router.replace('/')}
        radius={2}
      />
      {!state.success && state.message && (
        <Alert marginTop={8} color="negative">
          {state.message}
        </Alert>
      )}
    </Section>
  );
};
