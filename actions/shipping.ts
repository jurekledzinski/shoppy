'use server';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { Cart, Order, OrderShippingSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateShipping,
} from '@/app/_helpers';

import {
  connectDBAction,
  createToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const secretAuth = process.env.AUTH_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

const payloadStepper = {
  allowed: '/shipping/place-order',
  completed: ['/', '/shipping'],
};

export const shipping = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');
    const body = Object.fromEntries(formData);

    const token = await getToken({
      req: { headers: headersData },
      secret: secretAuth,
    });

    const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

    const parsedData = OrderShippingSchema.parse({
      ...body,
      createdAt: new Date(body.createdAt as string),
      isDelivered: false,
      isPaid: false,
      isSent: false,
      ...(cookieGuest && { expiryAt: expiresIn }), //ustaw na 2 godziny dla order
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

      const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
      if (!collectionCarts) return errorMessageAction('Internal server error');

      await updateCartExpiryAt(collectionCarts, dataGuest.payload.value);

      await updateShipping(collection, parsedData, 'guestId');

      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_order');

      return {
        message: 'Shipping data added successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      // gdy user normalny zalogowany i guest user nie zalogowany ale jest stepper
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await updateShipping(collection, parsedData, 'userId');

      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      revalidateTag('get_order');

      return {
        message: 'Shipping data added successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
