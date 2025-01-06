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

// usunąć cart z bazy danych
// usunąć order z bazy danych
// clear koszyk
// delete cookie guest user i stepper

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
      // gdy user normalny niezalogowany i guest user zalogowany i jest stepper
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      // delete order
      await deleteOrder(collectionOrders, orderId);

      // delete cart
      await deleteCart(collectionCarts, 'guestId', dataGuest.payload.value);

      // Remove cookie guestId i stepper
      deleteCookie(cookieStore, 'guestId');
      deleteCookie(cookieStore, 'stepper');

      revalidateTag('get_order');

      return {
        message: 'Cancel order successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      // gdy user normalny zalogowany i guest user nie zalogowany ale jest stepper
      await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      // delete order
      await deleteOrder(collectionOrders, orderId);

      // delete cart
      await deleteCart(collectionCarts, 'userId', 'userId1231');

      // Remove cookie stepper
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
