'use server';
import { cookies } from 'next/headers';
import { createToken, getExpireInCookie, setCookieStepper } from '@/lib';

const secretStepper = process.env.STEPPER_SECRET!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;
const payloadStepper = { allowed: '/shipping', completed: ['/'] };

export const userCheckout = async (prevState: unknown, formData: FormData) => {
  Object.fromEntries(formData);
  const cookieStore = await cookies();

  const expiresIn = getExpireInCookie();

  const tokenStepper = await createToken(
    payloadStepper,
    secretStepper,
    expireStepperToken
  );

  setCookieStepper(cookieStore, tokenStepper, expiresIn);

  return {
    message: 'Procces checkout as user successful',
    success: true,
  };
};
