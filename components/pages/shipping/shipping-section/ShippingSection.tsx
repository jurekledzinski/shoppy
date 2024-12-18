'use client';
import { ShippingSectionProps } from './types';
import styles from './ShippingSection.module.css';
import { useShippingForm } from '@/hooks';
import { ShippingForm } from '../shipping-form';
import { useActionState } from 'react';
import { shipping } from '@/actions';
import { showToast } from '@/helpers';
// import { useRouter } from 'next/navigation';

export const ShippingSection = ({
  children,
  userData,
}: ShippingSectionProps) => {
  //   const router = useRouter();

  const [stateShipping, formActionShipping, isPendingShipping] = useActionState(
    shipping,
    {
      message: '',
      success: false,
    }
  );

  const { methodsShipping, onSubmitShipping } = useShippingForm({
    formAction: formActionShipping,
    isPending: isPendingShipping,
    isSuccess: stateShipping.success,
    onSuccess: () => {
      showToast(stateShipping.message);

      //   router.replace('/place-order');
    },
  });

  return (
    <section className={styles.section}>
      {children}
      <ShippingForm
        isPending={isPendingShipping}
        methods={methodsShipping}
        onSubmit={onSubmitShipping}
        state={stateShipping}
        onCancel={(e) => {
          e.preventDefault();
          console.log('userData', userData);
        }}
      />
    </section>
  );
};
