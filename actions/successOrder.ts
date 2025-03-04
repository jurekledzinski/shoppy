'use server';
import { Cart, OrderSuccessSchema } from '@/models';
import {
  connectDBAction,
  deleteCart,
  deleteCookie,
  updateProductsQuantity,
  updateSuccessOrder,
  getSessionData,
  validationData,
} from '@/lib';
import { revalidateTag } from 'next/cache';

export const successOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string) as Cart;
    const orderId = body.orderId as string;

    const parsedData = OrderSuccessSchema.parse({
      cart,
      isPaid: true,
    });

    const result = await validationData(cookieGuest, token, cookieStepper);
    if ('message' in result) return result;
    const { collectionCarts, collectionOrders, collectionProducts, guest } =
      result;

    if (!token && cookieGuest && cookieStepper) {
      await deleteCart(collectionCarts, 'guestId', guest);
      deleteCookie(cookieStore, 'guestId');
    }

    if (token && !cookieGuest && cookieStepper) {
      await deleteCart(collectionCarts, 'userId', token.id as string);
    }

    await updateProductsQuantity(collectionProducts, cart.products);
    await updateSuccessOrder(collectionOrders, parsedData, orderId);

    deleteCookie(cookieStore, 'stepper');

    revalidateTag('get_order');
    revalidateTag('get_products');

    return {
      message: 'Order updated successful',
      success: true,
    };
  }
);
