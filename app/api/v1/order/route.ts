import 'server-only';
import { auth } from '@/auth';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';
import { Order } from '@/models';

import {
  connectDBAuth,
  getCollectionDb,
  getSessionData,
  validateAuth,
} from '@/lib';

export const GET = connectDBAuth(
  auth(async (request) => {
    const { cookieGuest, cookieStepper, token } = await getSessionData();

    const checkAuth = await validateAuth(cookieGuest, token, cookieStepper);

    if ('message' in checkAuth) return errorMessage(401, 'Unauthorized');

    const { guest } = checkAuth;

    const userId = request.auth?.user.id ?? null;

    const collection = getCollectionDb<Order>('orders');
    if (!collection) return errorMessage(500);

    let result: Order | null = null;

    if (!userId && cookieGuest && cookieStepper) {
      result = await collection.findOne({
        guestId: guest,
      });
    }

    if (userId && !cookieGuest && cookieStepper) {
      result = await collection.findOne(
        {
          userId,
          isPaid: false,
        },
        { sort: { createdAt: -1 } }
      );
    }

    const response = NextResponse.json({
      success: true,
      payload: result,
    });

    return response;
  })
);
