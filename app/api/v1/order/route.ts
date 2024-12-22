import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';
import { Order } from '@/models';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

// Update cookies expiration time for guestId and stepper but value of the cookies stay same
// we can create new token with same values of cookie but updated expiration time

export const GET = connectDBAuth(
  auth(async (request) => {
    const cookieGuest = request.cookies.get('guestId')!;
    const cookieStepper = request.cookies.get('stepper')!;

    console.log('guestId get route api', cookieGuest);

    // Gdy user nie zalogowany to wtedy może być guest user
    if (!request.auth) {
      if (!cookieGuest || !cookieStepper) {
        return errorMessage(401);
      }

      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{ value: { allowed: string; completed: string[] } }>(
        cookieStepper.value,
        secretStepper
      );

      if (cookieGuest) {
        const collection = getCollectionDb<Omit<Order, '_id'>>('orders');

        if (!collection) return errorMessage(500);

        const result = await collection.findOne({
          guestId: dataGuest.payload.value,
        });

        const response = NextResponse.json({
          success: true,
          payload: result,
        });

        return response;
      }

      return errorMessage(401);
    }

    // Gdy user zalogowany

    await verifyToken<{ value: { allowed: string; completed: string[] } }>(
      cookieStepper.value,
      secretStepper
    );

    const collection = getCollectionDb<Omit<Order, '_id'>>('orders');

    if (!collection) return errorMessage(500);

    // by userId and last added

    const result = await collection.findOne(
      {
        userId: request.auth.user.id,
        isPaid: false,
      },
      { sort: { createdAt: -1 } }
    );

    const response = NextResponse.json({
      success: true,
      payload: result,
    });

    return response;
  })
);
