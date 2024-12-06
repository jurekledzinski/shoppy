import 'server-only';
import { connectDB, getCollectionDb, verifyToken } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest, NextResponse } from 'next/server';
import { Review, UserID } from '@/models';

export const POST = connectDB(async (request: NextRequest) => {
  const secret = process.env.JWT_SECRET_ACCESS!;
  const cookie = request.cookies.get('auth');
  const body = (await request.json()) as Omit<Review, '_id'>;

  if (!cookie) return errorMessage(401);

  verifyToken(cookie.value, secret) as UserID;

  const collection = getCollectionDb<Omit<Review, '_id'>>('reviews');

  if (!collection) return errorMessage(500);

  await collection.insertOne({ ...body });

  const response = NextResponse.json({
    success: true,
  });

  return response;
});

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
