'use server';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { Cart, Order, OrderPlaceOrderSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updatePlaceOrder,
} from '@/app/_helpers';

import {
  connectDBAction,
  createToken,
  getAuthToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

const payloadStepper = {
  allowed: '/shipping/place-order/details-order',
  completed: ['/', '/shipping', '/shipping/place-order'],
};

export const placeOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');
    const body = Object.fromEntries(formData);

    const token = await getAuthToken({ headers: headersData });

    const expiresIn = getExpireInCookie();
    const parsedData = OrderPlaceOrderSchema.parse({
      ...body,
      priceDelivery: parseFloat(body.priceDelivery as string),
      timeDelivery: parseInt(body.timeDelivery as string),
      ...(cookieGuest && { expiryAt: expiresIn }),
    });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collection = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collection) return errorMessageAction('Internal server error');

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

      const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
      if (!collectionCarts) return errorMessageAction('Internal server error');

      await updateCartExpiryAt(
        collectionCarts,
        dataGuest.payload.value,
        expiresIn
      );

      await updatePlaceOrder(collection, parsedData);

      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_order');

      return {
        message: 'Place order data added successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await updatePlaceOrder(collection, parsedData);

      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_order');

      return {
        message: 'Place order data added successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
