import 'server-only';
import { auth } from '@/auth';
import { connectDB, connectDBAuth, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { Review } from '@/models';

export const POST = connectDBAuth(
  auth(async (request) => {
    const body = (await request.json()) as Omit<Review, '_id'>;

    if (!request.auth) return errorMessage(401);

    const collection = getCollectionDb<Omit<Review, '_id'>>('reviews');

    if (!collection) return errorMessage(500);

    await collection.insertOne({ ...body });

    const response = NextResponse.json({
      success: true,
    });

    return response;
  })
);

export const GET = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('product_id')!;

  const collection = getCollectionDb<Omit<Review, '_id'>>('reviews');

  if (!collection) return errorMessage(500);

  const result = await collection.find({ productId: productId }).toArray();

  const response = NextResponse.json({
    success: true,
    payload: result,
  });

  return response;
});
