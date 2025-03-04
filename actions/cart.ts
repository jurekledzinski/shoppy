'use server';
import { Cart, CartSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
  getAuthSecrets,
  getSessionData,
  validationData,
  processCartUpdate,
} from '@/lib';

export const cart = connectDBAction<Cart>(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const { cookieGuest, cookieStore, token } = await getSessionData();

    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string);

    const parsedData = CartSchema.parse({
      ...cart,
      ...(body.userId && { userId: body.userId }),
      ...(body.guestId && { guestId: body.guestId }),
      ...(body.expiryAt && { expiryAt: new Date(body.expiryAt as string) }),
    });

    const result = await validationData(cookieGuest, token);
    if ('message' in result) return result;
    const { collectionCarts, collectionProducts, guest } = result;

    const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

    let updatedCart = parsedData;

    if (!token && cookieGuest) {
      const tokenGuest = await createToken(
        guest,
        AUTH.SECRET_GUEST,
        AUTH.EXPIRE_GUEST_TOKEN
      );

      updatedCart = await processCartUpdate(
        collectionCarts,
        collectionProducts,
        parsedData,
        'guestId',
        cookieStore,
        expiresIn,
        tokenGuest
      );
    } else if (token && !cookieGuest) {
      updatedCart = await processCartUpdate(
        collectionCarts,
        collectionProducts,
        parsedData,
        'userId',
        cookieStore,
        expiresIn
      );
    }

    revalidateTag('get_products');

    return {
      message: 'Cart updated successfully',
      success: true,
      payload: updatedCart,
    };
  }
);
