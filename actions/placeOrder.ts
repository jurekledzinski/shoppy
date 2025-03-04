'use server';
import { OrderPlaceOrderSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  connectDBAction,
  createToken,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updatePlaceOrder,
  stepperStepsPlaceOrder,
  getAuthSecrets,
  getSessionData,
  validationData,
} from '@/lib';

export const placeOrder = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const STEPPER_PAYLOAD = await stepperStepsPlaceOrder();

    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const expiresIn = getExpireInCookie();

    const body = Object.fromEntries(formData);

    const parsedData = OrderPlaceOrderSchema.parse({
      ...body,
      priceDelivery: parseFloat(body.priceDelivery as string),
      timeDelivery: parseInt(body.timeDelivery as string),
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
      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    }

    await updatePlaceOrder(collectionOrders, parsedData);
    setCookieStepper(cookieStore, tokenStepper, expiresIn);

    revalidateTag('get_order');

    return {
      message: 'Place order data added successful',
      success: true,
    };
  }
);
