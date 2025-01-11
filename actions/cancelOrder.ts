'use server';
import { Cart, Order } from '@/models';
import { connectDBAction, getCollectionDb, verifyToken } from '@/lib';
import { cookies, headers } from 'next/headers';
import { deleteCart, deleteCookie, deleteOrder } from '@/app/_helpers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { revalidateTag } from 'next/cache';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const secretAuth = process.env.AUTH_SECRET!;

export const cancelOrder = connectDBAction(
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

    if (!token && cookieGuest && cookieStepper) {
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await deleteOrder(collectionOrders, orderId);

      await deleteCart(collectionCarts, 'guestId', dataGuest.payload.value);

      deleteCookie(cookieStore, 'guestId');
      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');

      return {
        message: 'Cancel order successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      await deleteOrder(collectionOrders, orderId);

      await deleteCart(collectionCarts, 'userId', token.id as string);

      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');

      return {
        message: 'Cancel order successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
