import 'server-only';
import { auth } from '@/auth';
import { connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextResponse } from 'next/server';
import { Order } from '@/models';

export const GET = connectDBAuth(
  auth(async (request) => {
    if (!request.auth) return errorMessage(401);

    const collection = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collection) return errorMessage(500);

    const result = await collection
      .find(
        {
          userId: request.auth.user.id,
        },
        { sort: { createdAt: -1 } }
      )
      .toArray();

    const response = NextResponse.json({
      success: true,
      payload: result,
    });

    return response;
  })
);
