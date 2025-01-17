'use server';
import { Cart, Order, OrderSuccessSchema, ProductCard } from '@/models';
import {
  connectDBAction,
  getAuthToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { revalidateTag } from 'next/cache';

import {
  deleteCart,
  deleteCookie,
  updateProductsQuantity,
  updateSuccessOrder,
} from '@/app/_helpers';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

export const successOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');

    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string) as Cart;
    const orderId = body.orderId as string;

    const token = await getAuthToken({ headers: headersData });

    const parsedData = OrderSuccessSchema.parse({
      cart,
      isPaid: true,
    });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collectionOrders = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collectionOrders) return errorMessageAction('Internal server error');

    const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
    if (!collectionCarts) return errorMessageAction('Internal server error');

    const collectionProducts = getCollectionDb<ProductCard>('products');
    if (!collectionProducts) {
      return errorMessageAction('Internal server error');
    }

    if (!token && cookieGuest && cookieStepper) {
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await updateSuccessOrder(collectionOrders, parsedData, orderId);

      await updateProductsQuantity(collectionProducts, cart.products);

      await deleteCart(collectionCarts, 'guestId', dataGuest.payload.value);

      deleteCookie(cookieStore, 'guestId');
      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');
      revalidateTag('get_products');

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await updateSuccessOrder(collectionOrders, parsedData, orderId);

      await updateProductsQuantity(collectionProducts, cart.products);

      await deleteCart(collectionCarts, 'userId', token.id as string);

      revalidateTag('get_order');
      revalidateTag('get_products');

      deleteCookie(cookieStore, 'stepper');

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
