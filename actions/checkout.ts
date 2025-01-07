'use server';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { Cart, Order, OrderCheckoutSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  createStripeSessionCheckout,
  formatBuyedProducts,
  formatShippingData,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateCheckoutOrder,
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
  allowed: '/shipping/place-order/details-order',
  completed: [
    '/',
    '/shipping',
    '/shipping/place-order',
    '/shipping/place-order/details-order',
  ],
};

// if as guest and paid will be remove expire at property and change isPaid na true

export const checkout = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');
    const body = Object.fromEntries(formData);
    const cartProducts = JSON.parse(body.products as string);
    const orderId = body._id as string;
    const methodDelivery = body.methodDelivery as string;
    const priceDelivery = parseFloat(body.priceDelivery as string);
    const timeDelivery = parseInt(body.timeDelivery as string);

    const token = await getToken({
      req: { headers: headersData },
      secret: secretAuth,
    });

    const parsedData = OrderCheckoutSchema.parse({
      ...body,
      methodDelivery,
      timeDelivery,
      priceDelivery,
      termsConditions: body.termsConditions === 'true' ? true : false,
    });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collection = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collection) return errorMessageAction('Internal server error');

    const expiresIn = getExpireInCookie();
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

      await updateCartExpiryAt(
        collectionCarts,
        dataGuest.payload.value,
        expiresIn
      );

      await updateCheckoutOrder(collection, parsedData);

      setCookieGuestId(cookieStore, tokenGuest, expiresIn, 'lax');
      setCookieStepper(cookieStore, tokenStepper, expiresIn, 'lax');

      const formattedProducts = formatBuyedProducts(cartProducts);
      const shippingOptions = formatShippingData(
        methodDelivery,
        priceDelivery,
        timeDelivery
      );
      const sessionStripe = await createStripeSessionCheckout(
        formattedProducts,
        orderId,
        shippingOptions
      );

      revalidateTag('get_order');

      return {
        message: 'Checkout order successful',
        success: true,
        payload: { id: sessionStripe.id },
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      // gdy user normalny zalogowany i guest user nie zalogowany ale jest stepper
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await updateCheckoutOrder(collection, parsedData);

      setCookieStepper(cookieStore, tokenStepper, expiresIn, 'lax');

      const formattedProducts = formatBuyedProducts(cartProducts);
      const shippingOptions = formatShippingData(
        methodDelivery,
        priceDelivery,
        timeDelivery
      );
      const sessionStripe = await createStripeSessionCheckout(
        formattedProducts,
        orderId,
        shippingOptions
      );

      revalidateTag('get_order');

      return {
        message: 'Checkout order successful',
        success: true,
        payload: { id: sessionStripe.id },
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
