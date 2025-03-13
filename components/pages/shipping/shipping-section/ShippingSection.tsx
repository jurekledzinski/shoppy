'use client';
import { Suspense } from 'react';
import { Loader, Section } from '@/components/shared';
import { shipping } from '@/actions';
import { ShippingForm } from '../shipping-form';
import { ShippingSectionProps } from './types';
import { showToast } from '@/helpers';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useShippingForm } from '@/hooks';

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
    onSubmitForm: formActionShipping,
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
      <Suspense fallback={<Loader position="center" size={30} />}>
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
