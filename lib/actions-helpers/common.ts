'use server';

import { cookies, headers } from 'next/headers';
import {
  getAuthToken,
  getCollectionDb,
  VerifyGuestUser,
  VerifyStepper,
  verifyToken,
} from '@/lib';
import { errorMessageAction } from '@/helpers';
import { Cart, Order, ProductCard } from '@/models';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { JWT } from 'next-auth/jwt';

export const getSessionData = async () => {
  const cookieStore = await cookies();
  const headersData = await headers();
  const cookieGuest = cookieStore.get('guestId');
  const cookieStepper = cookieStore.get('stepper');
  const token = await getAuthToken({ headers: headersData });

  return {
    cookieStore,
    cookieGuest,
    cookieStepper,
    token,
  };
};

export const getAuthSecrets = async () => ({
  SECRET_GUEST: process.env.GUEST_SECRET!,
  SECRET_STEPPER: process.env.STEPPER_SECRET!,
  EXPIRE_GUEST_TOKEN: process.env.EXPIRE_GUEST_TOKEN!,
  EXPIRE_STEPPER_TOKEN: process.env.EXPIRE_STEPPER_TOKEN!,
  SECRET_FORGET_PASSWORD: process.env.JWT_SECRET_FORGET_PASSWORD!,
  LIFETIME_ACCESS_TOKEN: process.env.JWT_LIFETIME_SECRET_FORGET_PASSWORD!,
});

export const stepperStepsFinish = async () => ({
  allowed: '/shipping/place-order/details-order',
  completed: [
    '/',
    '/shipping',
    '/shipping/place-order',
    '/shipping/place-order/details-order',
  ],
});

export const stepperStepsPlaceOrder = async () => ({
  allowed: '/shipping/place-order/details-order',
  completed: ['/', '/shipping', '/shipping/place-order'],
});

export const stepperStepsShipping = async () => ({
  allowed: '/shipping/place-order',
  completed: ['/', '/shipping'],
});

export const stepperStepsStart = async () => ({
  allowed: '/shipping',
  completed: ['/'],
});

export const fetchCollectionsDb = async () => {
  const collectionOrders = getCollectionDb<Omit<Order, '_id'>>('orders');
  const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
  const collectionProducts = getCollectionDb<ProductCard>('products');

  if (!collectionProducts || !collectionCarts || !collectionOrders) {
    return errorMessageAction('Internal server error');
  }

  return { collectionOrders, collectionCarts, collectionProducts };
};

export const verifyGuestUser: VerifyGuestUser = async (
  cookieGuest,
  secretGuest
) => {
  if (!cookieGuest?.value) return null;

  const guestData = await verifyToken<{ value: string }>(
    cookieGuest.value,
    secretGuest
  );

  return guestData.payload.value;
};

export const verifyStepper: VerifyStepper = async (
  cookieStepper,
  secretStepper
) => {
  if (!cookieStepper) return null;

  return await verifyToken<{
    value: { allowed: string; completed: string[] };
  }>(cookieStepper.value, secretStepper);
};

export const validateAuth = async (
  cookieGuest: RequestCookie | undefined,
  token: JWT | null,
  cookieStepper?: RequestCookie
) => {
  const AUTH = await getAuthSecrets();

  const stepper = cookieStepper
    ? await verifyStepper(cookieStepper, AUTH.SECRET_STEPPER)
    : null;

  if (token) {
    if (cookieGuest) return errorMessageAction('Unauthorized');
    if (!stepper && cookieStepper) return errorMessageAction('Unauthorized');

    return cookieStepper ? { guest: '', stepper } : { guest: '' };
  }

  if (cookieGuest) {
    if (!stepper && cookieStepper) return errorMessageAction('Unauthorized');
    const guest = await verifyGuestUser(cookieGuest, AUTH.SECRET_GUEST);
    if (!guest) return errorMessageAction('Unauthorized');

    return cookieStepper ? { guest, stepper } : { guest };
  }

  return errorMessageAction('Unauthorized');
};

export const validationData = async (
  cookieGuest: RequestCookie | undefined,
  token: JWT | null,
  cookieStepper?: RequestCookie
) => {
  const guest = await validateAuth(cookieGuest, token, cookieStepper);

  if ('message' in guest) return guest;

  const collection = await fetchCollectionsDb();

  if ('message' in collection) return collection;

  return { ...guest, ...collection };
};
