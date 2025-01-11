'use client';
import { ShippingSectionProps } from './types';
// import styles from './ShippingSection.module.css';
import { Section } from '@/components/shared';
import { useShippingForm } from '@/hooks';
import { ShippingForm } from '../shipping-form';
import { useActionState } from 'react';
import { shipping } from '@/actions';
import { showToast } from '@/helpers';
import { useRouter } from 'next/navigation';

export const ShippingSection = ({
  children,
  guestId,
  userData,
  orderData,
}: ShippingSectionProps) => {
  const router = useRouter();
  const userId = userData?._id ?? '';

  const [stateShipping, formActionShipping, isPendingShipping] = useActionState(
    shipping,
    {
      message: '',
      success: false,
    }
  );

  const { methodsShipping, onSubmitShipping } = useShippingForm({
    defaultData: orderData,
    formAction: formActionShipping,
    isPending: isPendingShipping,
    isSuccess: stateShipping.success,
    onSuccess: () => {
      showToast(stateShipping.message);
      router.replace('/shipping/place-order');
    },
    guestId,
    userId,
  });

  return (
    <Section>
      {children}
      <ShippingForm
        isPending={isPendingShipping}
        methods={methodsShipping}
        onSubmit={onSubmitShipping}
        state={stateShipping}
      />
    </Section>
  );
};
