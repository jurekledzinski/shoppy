'use server';
import { Cart, Order, OrderSuccessSchema, ProductCard } from '@/models';
import { connectDBAction, getCollectionDb, verifyToken } from '@/lib';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { revalidateTag } from 'next/cache';

import {
  deleteCart,
  deleteCookie,
  updateProductsQuantity,
  updateSuccessOrder,
} from '@/app/_helpers';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const secretAuth = process.env.AUTH_SECRET!;

export const successOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');

    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string) as Cart;
    const orderId = body.orderId as string;

    const token = await getToken({
      req: { headers: headersData },
      secret: secretAuth,
    });

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
      // gdy user normalny niezalogowany i guest user zalogowany i jest stepper
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      // add cart to order
      await updateSuccessOrder(collectionOrders, parsedData, orderId);

      // delete cart
      await deleteCart(collectionCarts, 'guestId', dataGuest.payload.value);

      // update products quantity
      await updateProductsQuantity(collectionProducts, cart.products);

      // Remove cookie guestId i stepper
      deleteCookie(cookieStore, 'guestId');
      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');
      revalidateTag('get_product');

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

      // add cart to order
      await updateSuccessOrder(collectionOrders, parsedData, orderId);

      // delete cart
      await deleteCart(collectionCarts, 'userId', token.id as string);

      // update products quantity
      await updateProductsQuantity(collectionProducts, cart.products);

      // Remove cookie stepper
      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');
      revalidateTag('get_product');

      return {
        message: 'Order updated successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
