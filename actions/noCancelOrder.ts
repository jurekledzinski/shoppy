'use server';
import { Cart, Order } from '@/models';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
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
const secretAuth = process.env.AUTH_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

// guestUser:
// extend cart expiryAt o 45 minut ok
// extend guestId o 45 minut
// extend stepper o 45 minut
// extend order dla guestId o expiryAt o 45 minut

// user normal logged in:
// stepper dla user logged in to expire token next auth

export const noCancelOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');

    const body = Object.fromEntries(formData);
    const orderId = body.orderId as string;

    const token = await getToken({
      req: { headers: headersData },
      secret: secretAuth,
    });

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
      // gdy user normalny niezalogowany i guest user zalogowany i jest stepper
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

      // Update expiry at w cart
      await updateCartExpiryAt(
        collectionCarts,
        dataGuest.payload.value,
        expiresIn
      );

      // update order expireAt in order
      await updateExpiryAtOrder(collectionOrders, orderId, expiresIn);

      // update cookie guestId i stepper
      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_cart');
      revalidateTag('get_order');

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      // gdy user normalny zalogowany i guest user nie zalogowany ale jest stepper
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      // update cookie stepper
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
