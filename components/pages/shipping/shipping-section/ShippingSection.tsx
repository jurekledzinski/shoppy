'use client';
import React, { Suspense } from 'react';
import { Loader, Section } from '@/components/shared';
import { shipping } from '@/actions';
import { ShippingForm } from '../shipping-form';
import { ShippingSectionProps } from './types';
import { showToast } from '@/helpers';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useShippingForm } from '@/hooks';

// import styles from './ShippingSection.module.css';

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
      <Suspense fallback={<Loader />}>
        <ShippingForm
          isPending={isPendingShipping}
          methods={methodsShipping}
          onSubmit={onSubmitShipping}
          state={stateShipping}
        />
      </Suspense>
    </Section>
  );
};
