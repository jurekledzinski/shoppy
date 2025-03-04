'use server';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateExpiryAtOrder,
  getAuthSecrets,
  stepperStepsFinish,
  getSessionData,
  validationData,
} from '@/lib';

export const noCancelOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const STEPPER_PAYLOAD = await stepperStepsFinish();

    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const body = Object.fromEntries(formData);
    const orderId = body.orderId as string;

    const result = await validationData(cookieGuest, token, cookieStepper);
    if ('message' in result) return result;
    const { collectionCarts, collectionOrders, guest } = result;

    const expiresIn = getExpireInCookie(45 * 60 * 1000);

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
      await updateExpiryAtOrder(collectionOrders, orderId, expiresIn);

      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    }

    setCookieStepper(cookieStore, tokenStepper, expiresIn);

    revalidateTag('get_order');

    return {
      message: 'Order updated successful',
      success: true,
    };
  }
);
