'use client';
// import styles from './DetailsOrderSection.module.css';
import { checkout } from '@/actions';
import { DetailsOrder } from '../details-order/DetailsOrder';
import { DetailsOrderSectionProps } from './types';
import { loadStripe } from '@stripe/stripe-js';
import { ModalControlInventoryCheck } from './modal-control-inventory-check';
import { showToast } from '@/helpers';
import { useActionStateAndReset, useTermsConditionsForm } from '@/hooks';
import { updateItem, updateSyncCart, useCart, removeItem } from '@/store/cart';
import { Section } from '@/components/shared';

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
            Object.entries(inventory).forEach((item) => {
              if (item[1] !== 0) {
                const payload = { id: item[0], qunatity: item[1] };

                dispatch({
                  type: 'SET_QUANTITY',
                  payload,
                });

                const resultUpdateCart = updateItem(state, {
                  type: 'SET_QUANTITY',
                  payload,
                });

                updateSyncCart(resultUpdateCart, userSession, guestSession);
              } else {
                const payload = { id: item[0] };

                dispatch({ type: 'REMOVE_ITEM', payload });

                const resultUpdateCart = removeItem(state, {
                  type: 'REMOVE_ITEM',
                  payload,
                });

                updateSyncCart(resultUpdateCart, userSession, guestSession);
              }
            });
            onClose();
            resetStateAction();
          }}
          title="Inventory check"
        />
      ) : null}
      <Section>
        {children}
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
      </Section>
    </>
  );
};
