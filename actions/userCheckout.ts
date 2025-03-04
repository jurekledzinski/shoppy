'use server';
import { cookies } from 'next/headers';
import {
  createToken,
  getAuthSecrets,
  getExpireInCookie,
  setCookieStepper,
  stepperStepsStart,
} from '@/lib';

export const userCheckout = async (prevState: unknown, formData: FormData) => {
  const AUTH = await getAuthSecrets();
  const STEPPER_PAYLOAD = await stepperStepsStart();

  Object.fromEntries(formData);
  const cookieStore = await cookies();

  const expiresIn = getExpireInCookie();

  const tokenStepper = await createToken(
    STEPPER_PAYLOAD,
    AUTH.SECRET_STEPPER,
    AUTH.EXPIRE_STEPPER_TOKEN
  );

  setCookieStepper(cookieStore, tokenStepper, expiresIn);

  return {
    message: 'Procces checkout as user successful',
    success: true,
  };
};
