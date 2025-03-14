import 'server-only';
import { auth } from '@/auth';
import { Cart } from '@/models';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';

import {
  connectDBAuth,
  getCollectionDb,
  getSessionData,
  getCartByUser,
  validateAuth,
} from '@/lib';

export const GET = connectDBAuth(
  auth(async (request) => {
    const { cookieGuest, cookieStepper, token } = await getSessionData();

    const checkAuth = await validateAuth(cookieGuest, token, cookieStepper);

    if ('message' in checkAuth) return errorMessage(401, 'Unauthorized');

    const { guest } = checkAuth;

    const userId = request.auth?.user.id ?? null;

    const collection = getCollectionDb<Cart>('carts');
    if (!collection) return errorMessage(500);

    let result: Cart | null = null;

    if (!userId && cookieGuest && cookieStepper) {
      result = await getCartByUser(collection, 'guestId', guest);
    }

    if (userId && !cookieGuest && cookieStepper) {
      result = await getCartByUser(collection, 'userId', userId);
    }

    if (userId && !cookieGuest && !cookieStepper) {
      result = await getCartByUser(collection, 'userId', userId);
    }

    const response = NextResponse.json({
      success: true,
      payload: result,
    });

    return response;
  })
);
