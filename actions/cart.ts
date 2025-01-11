'use server';
import { Cart, CartSchema } from '@/models';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { getToken } from 'next-auth/jwt';
import { setCookieGuestId, setCookieStepper, updateCart } from '@/app/_helpers';

import {
  connectDBAction,
  createToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const secretAuth = process.env.AUTH_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

export const cart = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');
    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string);

    const token = await getToken({
      req: { headers: headersData },
      secret: secretAuth,
    });

    const parsedData = CartSchema.parse({
      ...cart,
      ...(body.userId && { userId: body.userId }),
      ...(body.guestId && { guestId: body.guestId }),
      ...(body.expiryAt && { expiryAt: new Date(body.expiryAt as string) }),
    });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collection = getCollectionDb<Omit<Cart, '_id'>>('carts');
    if (!collection) return errorMessageAction('Internal server error');

    const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

    if (!token && cookieGuest && cookieStepper) {
      const dataStepper = await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      const tokenStepper = await createToken(
        dataStepper.payload.value,
        secretStepper,
        expireStepperToken
      );

      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      const tokenGuest = await createToken(
        dataGuest.payload.value,
        secretGuest,
        expireGuestToken
      );

      await updateCart(collection, parsedData, 'guestId');

      setCookieGuestId(cookieStore, tokenGuest, expiresIn);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      return {
        message: 'Cart updated successful',
        success: true,
      };
    }

    if (token && !cookieGuest && cookieStepper) {
      const dataStepper = await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      const tokenStepper = await createToken(
        dataStepper.payload.value,
        secretStepper,
        expireStepperToken
      );

      await updateCart(collection, parsedData, 'userId');

      setCookieStepper(cookieStore, tokenStepper, expiresIn);

      return {
        message: 'Cart updated successful',
        success: true,
      };
    }

    if (token && !cookieGuest && !cookieStepper) {
      await updateCart(collection, parsedData, 'userId');

      return {
        message: 'Cart updated bez click checkout successful',
        success: true,
      };
    }

    return errorMessageAction('Unauthorized');
  }
);
