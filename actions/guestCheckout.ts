'use server';
import {
  createToken,
  getAuthSecrets,
  getSessionData,
  stepperStepsStart,
  setCookieGuestId,
  setCookieStepper,
} from '@/lib';
import { v4 as uuidv4 } from 'uuid';

export const guestCheckout = async (prevState: unknown, formData: FormData) => {
  Object.fromEntries(formData);
  const AUTH = await getAuthSecrets();
  const STEPPER_PAYLOAD = await stepperStepsStart();
  const { cookieStore } = await getSessionData();

  const guestId = uuidv4();
  const tokenGuest = await createToken(
    guestId,
    AUTH.SECRET_GUEST,
    AUTH.EXPIRE_GUEST_TOKEN
  );

  const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

  const tokenStepper = await createToken(
    STEPPER_PAYLOAD,
    AUTH.SECRET_STEPPER,
    AUTH.EXPIRE_STEPPER_TOKEN
  );

  setCookieGuestId(cookieStore, tokenGuest, expiresIn);
  setCookieStepper(cookieStore, tokenStepper, expiresIn);

  return {
    message: 'Procces checkout as guest successful',
    success: true,
  };
};
