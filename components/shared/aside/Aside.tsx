'use client';
import styles from './Aside.module.css';
import { AsideProps } from './types';
import { extendGuestSession } from '@/actions';
import { removeQueryUrl, showToast } from '@/helpers';
import { startTransition, useActionState, useCallback } from 'react';
import { useAside } from '@/store/aside';
import { useCart } from '@/store/cart';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSessionUser } from '@/store/session';

import {
  AsidePanels,
  useAsideHandlers,
  ModalGuestSession,
} from '@/components/pages';

import {
  useLoadResetPasswordForm,
  useSetCartOnRefresh,
  useSetUserSession,
  initialState,
} from '@/hooks';

export const Aside = ({ guestId, userData }: AsideProps) => {
  const searchParams = useSearchParams();
  const paramActionType = searchParams.get('action_type');
  const guestUserExpire = searchParams.get('guest-user-expired');
  const context = useAside();
  const sessionUser = useSessionUser();
  const userId = userData?._id ?? '';
  const userName = userData?.name ?? '';
  const router = useRouter();
  const { dispatch, state: cartState } = useCart();

  const [stateExtendGuestSession, formAction, isPending] = useActionState(
    extendGuestSession,
    initialState
  );

  const asideHandlers = useAsideHandlers({
    cartState,
    context,
    onDispatch: (type, payload) => {
      if (type === 'CLEAR_CART') dispatch({ type });
      if (type === 'SET_CART' && payload) dispatch({ type, payload });
    },
    onRedirect: (url) => {
      router.replace(url);
      router.refresh();
    },
    onShowToast: (message) => showToast(message),
    user: { guestId: guestId ?? '', userName, userId },
  });

  useLoadResetPasswordForm({ context, paramActionType });

  useSetUserSession({
    guestId,
    sessionUser,
    userId,
    onLoggedGuest: useCallback(
      (guestId) => sessionUser.onSetValue('guestUser', guestId),
      [sessionUser]
    ),
    onNotLoggedGuest: useCallback(
      () => sessionUser.onSetValue('guestUser', null),
      [sessionUser]
    ),
    onLoggedUser: useCallback(
      (userId) => sessionUser.onSetValue('userSession', userId),
      [sessionUser]
    ),
    onNotLoggedUser: useCallback(
      () => sessionUser.onSetValue('userSession', null),
      [sessionUser]
    ),
  });

  useSetCartOnRefresh({
    onLoad: useCallback(
      (cart) => {
        if (!cart) return;
        dispatch({ type: 'SET_CART', payload: cart });
      },
      [dispatch]
    ),
    userSession: userId,
    guestSession: guestId,
  });

  return (
    <>
      <ModalGuestSession
        isPending={isPending}
        isOpen={guestUserExpire === 'true'}
        isSuccess={stateExtendGuestSession.success && !isPending}
        onConfirm={() => {
          startTransition(() => formAction(new FormData()));
          const newPath = removeQueryUrl(searchParams, 'guest-user-expired');
          setTimeout(() => router.replace(newPath), 1000);
        }}
      />

      <aside
        className={`${styles.aside} ${
          context.value ? styles.show : styles.aside
        }`}
      >
        <AsidePanels
          cartState={cartState}
          context={context}
          isPending={
            asideHandlers.isPendingUserCheckout ||
            asideHandlers.isPendingGuestCheckout
          }
          onCancel={asideHandlers.onCancelHandler}
          onContinue={asideHandlers.onContinueHandler}
          onDispatch={(type, payload) => dispatch({ type, payload })}
          onRedirect={asideHandlers.onRedirectHandler}
          onSuccess={asideHandlers.onSuccessHandler}
          user={{ guestId: guestId ?? '', userName, userId }}
        />
      </aside>
    </>
  );
};
