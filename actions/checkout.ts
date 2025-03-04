'use server';
import { OrderCheckoutSchema } from '@/models';
import { revalidateTag } from 'next/cache';

import {
  CartInventoryPayload,
  connectDBAction,
  createToken,
  IdPayload,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  updateCartExpiryAt,
  updateCheckoutOrder,
  validateAndCheckInventory,
  processCheckout,
  getSessionData,
  getAuthSecrets,
  stepperStepsFinish,
  validationData,
} from '@/lib';

export const checkout = connectDBAction<IdPayload | CartInventoryPayload[]>(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const STEPPER_PAYLOAD = await stepperStepsFinish();

    const { cookieGuest, cookieStepper, cookieStore, token } =
      await getSessionData();

    const body = Object.fromEntries(formData);
    const orderId = body._id as string;

    const parsedData = OrderCheckoutSchema.parse({
      ...body,
      products: JSON.parse(body.products as string),
      methodDelivery: body.methodDelivery as string,
      timeDelivery: parseInt(body.timeDelivery as string),
      priceDelivery: parseFloat(body.priceDelivery as string),
      termsConditions: body.termsConditions === 'true',
    });

    const result = await validationData(cookieGuest, token, cookieStepper);
    if ('message' in result) return result;
    const { collectionCarts, collectionOrders, guest } = result;

    const inventoryResult = await validateAndCheckInventory(
      parsedData.products
    );

    if (inventoryResult && !inventoryResult.success) return inventoryResult;

    const expiresIn = getExpireInCookie();

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
      setCookieGuestId(cookieStore, tokenGuest, expiresIn, 'lax');
    }

    await updateCheckoutOrder(collectionOrders, parsedData);
    setCookieStepper(cookieStore, tokenStepper, expiresIn, 'lax');

    const sessionStripe = await processCheckout(parsedData, orderId);

    revalidateTag('get_order');

    return {
      message: 'Checkout order successful',
      success: true,
      payload: { id: sessionStripe.id },
    };
  }
);
