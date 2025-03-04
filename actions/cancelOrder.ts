'use server';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  deleteOrder,
  deleteCart,
  deleteCookie,
  getSessionData,
  validationData,
} from '@/lib';

export const cancelOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const body = Object.fromEntries(formData);
    const orderId = body.orderId as string;

    const result = await validationData(cookieGuest, token, cookieStepper);
    if ('message' in result) return result;
    const { collectionCarts, collectionOrders, guest } = result;

    if (!token && cookieGuest && cookieStepper) {
      await deleteCart(collectionCarts, 'guestId', guest);
      deleteCookie(cookieStore, 'guestId');
    }

    if (token && !cookieGuest && cookieStepper) {
      await deleteCart(collectionCarts, 'userId', token.id as string);
    }

    await deleteOrder(collectionOrders, orderId);
    deleteCookie(cookieStore, 'stepper');

    revalidateTag('get_order');

    return {
      message: 'Cancel order successful',
      success: true,
    };
  }
);
