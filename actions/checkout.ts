'use server';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { Cart, Order, OrderCheckoutSchema, ProductCard } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  CartInventoryPayload,
  connectDBAction,
  createToken,
  getAuthToken,
  getCollectionDb,
  IdPayload,
  verifyToken,
  checkProductsInventory,
  createStripeSessionCheckout,
  formatBuyedProducts,
  formatShippingData,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateCheckoutOrder,
} from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
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

export const checkout = connectDBAction<IdPayload | CartInventoryPayload[]>(
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

    if (cartProducts && !cartProducts.length) {
      return {
        message: "You've to add products to shopping cart",
        success: false,
      };
    }

    const token = await getAuthToken({ headers: headersData });

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

    const collectionProducts = getCollectionDb<ProductCard>('products');
    if (!collectionProducts) return errorMessageAction('Internal server error');

    const result = await checkProductsInventory(
      collectionProducts,
      cartProducts
    );

    if (result && result.length > 0) {
      return {
        message:
          'Inventory check, Some products are in smaller quantities or unavailable',
        success: false,
        payload: result,
      };
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
        payload: { id: sessionStripe.id } as IdPayload,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
