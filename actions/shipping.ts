'use server';
import { OrderShippingSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateShipping,
  stepperStepsShipping,
  getAuthSecrets,
  getSessionData,
  validationData,
} from '@/lib';

export const shipping = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const STEPPER_PAYLOAD = await stepperStepsShipping();

    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const expiresIn = getExpireInCookie();

    const body = Object.fromEntries(formData);

    const parsedData = OrderShippingSchema.parse({
      ...body,
      createdAt: new Date(body.createdAt as string),
      isDelivered: false,
      isPaid: false,
      isSent: false,
      ...(cookieGuest && { expiryAt: expiresIn }),
    });

    const result = await validationData(cookieGuest, token, cookieStepper);
    if ('message' in result) return result;
    const { collectionCarts, collectionOrders, guest } = result;

    const tokenStepper = await createToken(
      STEPPER_PAYLOAD,
      AUTH.SECRET_STEPPER,
      AUTH.EXPIRE_STEPPER_TOKEN
    );

    if (!token && cookieGuest && cookieStepper) {
      const tokenGuest = await createToken(
        guest,
        AUTH.SECRET_GUEST,
        AUTH.EXPIRE_GUEST_TOKEN
      );

      await updateCartExpiryAt(collectionCarts, guest, expiresIn);
      await updateShipping(collectionOrders, parsedData, 'guestId');
      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    }

    if (token && !cookieGuest && cookieStepper) {
      await updateShipping(collectionOrders, parsedData, 'userId');
    }

    setCookieStepper(cookieStore, tokenStepper, expiresIn);

    revalidateTag('get_order');

    return {
      message: 'Shipping data added successful',
      success: true,
    };
  }
);
