'use client';
import { Suspense } from 'react';
import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { checkout } from '@/actions';
import { DetailsOrder } from '../details-order/DetailsOrder';
import { DetailsOrderSectionProps } from './types';
import { Loader, Section } from '@/components/shared';
import { loadStripe } from '@stripe/stripe-js';
import { ModalControlInventoryCheck } from './modal-control-inventory-check';
import {
  sumTotalAmountCart,
  sumTotalPriceCart,
  updateSyncCart,
  useCart,
} from '@/store/cart';
import { showToast } from '@/helpers';
import { useActionStateAndReset, useTermsConditionsForm } from '@/hooks';
import { Cart } from '@/models';
import { cloneDeep } from 'lodash';

export const DetailsOrderSection = ({
  children,
  orderData,
  guestSession,
  userSession,
}: DetailsOrderSectionProps) => {
  const { dispatch, state } = useCart();
  const { action, resetStateAction } = useActionStateAndReset({
    fnAction: checkout,
  });

  const { methodsCheckoutOrder, onSubmitCheckoutOrder } =
    useTermsConditionsForm({
      cartData: state.cart,
      defaultData: orderData,
      formAction: action.formAction,
      isPending: action.isPending,
      isSuccess: action.state.success,
      onSuccess: async () => {
        showToast(action.state.message);
        const stripePromise = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
        );

        if (
          action.state &&
          action.state.payload &&
          'id' in action.state.payload
        ) {
          await stripePromise?.redirectToCheckout({
            sessionId: action.state.payload.id ?? '',
          });
        }
      },
    });

  return (
    <>
      {Array.isArray(action.state.payload) && action.state.payload.length ? (
        <ModalControlInventoryCheck
          cancel="Cancel"
          confirm="Save in cart"
          isPending={action.isPending}
          inventoryData={
            Array.isArray(action.state.payload) ? action.state.payload : []
          }
          onConfirm={(inventory, onClose) => {
            const updatedProducts = state.cart.products
              .map((product) => {
                const value = inventory[product._id as keyof typeof product];
                if (value) return { ...product, quantity: value };
                if (typeof value === 'undefined') return product;
                return null;
              })
              .filter(Boolean) as Cart['products'];

            const totalAmountCart = sumTotalAmountCart(updatedProducts);
            const totalPriceCart = sumTotalPriceCart(updatedProducts);

            const updateCart: Cart = {
              ...cloneDeep(state.cart),
              products: updatedProducts,
              totalAmountCart,
              totalPriceCart,
            };

            dispatch({ type: 'SET_CART', payload: updateCart });
            updateSyncCart({ cart: updateCart }, userSession, guestSession);
            resetStateAction();
            onClose();
          }}
          title="Inventory check"
        />
      ) : null}
      <Section>
        {children}
        <Suspense fallback={<Loader className={stylesLoader.loaderCenter} />}>
          <DetailsOrder
            cartData={state.cart}
            dataOrder={orderData}
            isPending={action.isPending}
            methods={methodsCheckoutOrder}
            onSubmit={onSubmitCheckoutOrder}
            state={action.state}
            titleAddress="Shipping address"
            titlePayment="Method payment"
            titleDelivery="Method delivery"
            titleOrders="Your orders"
            titleSummary="Summary"
          />
        </Suspense>
      </Section>
    </>
  );
};
