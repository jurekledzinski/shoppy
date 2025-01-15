'use client';
import { Suspense } from 'react';
import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { Loader, Section } from '@/components/shared';
import { PlaceOrder } from '../place-order/PlaceOrder';
import { placeOrder } from '@/actions';
import { PlaceOrderSectionProps } from './types';
import { showToast } from '@/helpers';
import { useActionState } from 'react';
import { useCart } from '@/store/cart';
import { usePlaceOrderForm } from '@/hooks';
import { useRouter } from 'next/navigation';

export const PlaceOrderSection = ({
  children,
  orderData,
}: PlaceOrderSectionProps) => {
  const router = useRouter();
  const { state } = useCart();

  const [statePlaceOrder, formActionPlaceOrder, isPendingPlaceOrder] =
    useActionState(placeOrder, {
      message: '',
      success: false,
    });

  const { Controller, methodsPlaceOrder, onSubmitPlaceOrder } =
    usePlaceOrderForm({
      defaultData: orderData,
      formAction: formActionPlaceOrder,
      isPending: isPendingPlaceOrder,
      isSuccess: statePlaceOrder.success,
      onSuccess: () => {
        showToast(statePlaceOrder.message);
        router.replace('/shipping/place-order/details-order');
      },
    });

  return (
    <Section>
      {children}
      <Suspense fallback={<Loader className={stylesLoader.loaderCenter} />}>
        <PlaceOrder
          cartData={state.cart}
          Controller={Controller}
          dataOrder={orderData}
          isPending={isPendingPlaceOrder}
          methods={methodsPlaceOrder}
          methodsDelivery={[
            { name: 'standard', price: 3, time: 3 },
            { name: 'next day', price: 5, time: 1 },
            { name: 'abroad', price: 8, time: 14 },
          ]}
          methodsPayment={['credit card']}
          onSubmit={onSubmitPlaceOrder}
          state={statePlaceOrder}
          titleAddress="Shipping address"
          titlePayment="Select method payment"
          titleDelivery="Select method delivery"
          titleOrders="Your orders"
          titleSummary="Summary"
          textSubmit="Place order"
        />
      </Suspense>
    </Section>
  );
};
