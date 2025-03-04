import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';
import { Order } from '@/models';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

export const GET = connectDBAuth(
  auth(async (request) => {
    const cookieGuest = request.cookies.get('guestId')!;
    const cookieStepper = request.cookies.get('stepper')!;

    if (!request.auth && !cookieGuest && !cookieStepper) {
      return errorMessage(401);
    }

    const collection = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collection) return errorMessage(500);

    if (!request.auth && cookieGuest && cookieStepper) {
      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      await verifyToken<{ value: { allowed: string; completed: string[] } }>(
        cookieStepper.value,
        secretStepper
      );

      const result = await collection.findOne({
        guestId: dataGuest.payload.value,
      });

      const response = NextResponse.json({
        success: true,
        payload: result,
      });

      return response;
    }

    if (request.auth && !cookieGuest && cookieStepper) {
      await verifyToken<{ value: { allowed: string; completed: string[] } }>(
        cookieStepper.value,
        secretStepper
      );

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
    }

    return errorMessage(401);
  })
);
