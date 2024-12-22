'use server';
// import { connectDBAction } from '@/lib';
import { createToken } from '@/lib';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

export const guestCheckout = async (prevState: unknown, formData: FormData) => {
  Object.fromEntries(formData);
  const cookieStore = await cookies();

  const guestId = uuidv4();
  const tokenGuest = await createToken(guestId, secretGuest, expireGuestToken);
  const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
  const payloadStepper = { allowed: '/shipping', completed: ['/'] };
  const tokenStepper = await createToken(
    payloadStepper,
    secretStepper,
    expireStepperToken
  );

  cookieStore.set({
    name: 'stepper',
    value: tokenStepper,
    httpOnly: true,
    path: '/',
    expires: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  cookieStore.set({
    name: 'guestId',
    value: tokenGuest,
    httpOnly: true,
    path: '/',
    expires: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  redirect('/shipping');
};

//   redirect('/shipping', RedirectType.replace);

//   return {
//     message: 'Procces checkout as guest successful',
//     success: true,
//   };
