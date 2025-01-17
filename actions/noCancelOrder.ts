'use server';
import { Cart, Order } from '@/models';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
  getAuthToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';

import {
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateExpiryAtOrder,
} from '@/app/_helpers';

const payloadStepper = {
  allowed: '/shipping/place-order/details-order',
  completed: [
    '/',
    '/shipping',
    '/shipping/place-order',
    '/shipping/place-order/details-order',
  ],
};

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

export const noCancelOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');

    const body = Object.fromEntries(formData);
    const orderId = body.orderId as string;

    const token = await getAuthToken({ headers: headersData });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collectionOrders = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collectionOrders) return errorMessageAction('Internal server error');

    const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
    if (!collectionCarts) return errorMessageAction('Internal server error');

    const expiresIn = getExpireInCookie(45 * 60 * 1000);
    const tokenStepper = await createToken(
      payloadStepper,
      secretStepper,
      expireStepperToken
    );

    if (!token && cookieGuest && cookieStepper) {
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      const tokenGuest = await createToken(
        dataGuest.payload.value,
        secretGuest,
        expireGuestToken
      );

      await updateCartExpiryAt(
        collectionCarts,
        dataGuest.payload.value,
        expiresIn
      );

      await updateExpiryAtOrder(collectionOrders, orderId, expiresIn);

      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_order');

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
