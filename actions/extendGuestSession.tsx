'use server';
import { cookies } from 'next/headers';
import { createToken, verifyToken } from '@/lib';

import {
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
} from '@/app/_helpers';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

export const extendGuestSession = async (
  prevState: unknown,
  formData: FormData
) => {
  Object.fromEntries(formData);
  const cookieStore = await cookies();
  const cookieGuest = cookieStore.get('guestId');
  const cookieStepper = cookieStore.get('stepper');

  const expiresIn = getExpireInCookie();

  if (cookieGuest && cookieStepper) {
    const dataGuest = await verifyToken<{ value: string }>(
      cookieGuest.value,
      secretGuest
    );

    const dataStepper = await verifyToken<{
      value: { allowed: string; completed: string[] };
    }>(cookieStepper.value, secretStepper);

    const tokenGuest = await createToken(
      dataGuest.payload.value,
      secretGuest,
      expireGuestToken
    );

    const tokenStepper = await createToken(
      dataStepper.payload.value,
      secretStepper,
      expireStepperToken
    );

    setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    setCookieStepper(cookieStore, tokenStepper, expiresIn);
  }

  return {
    message: 'Guest user session extended successful',
    success: true,
  };
};
