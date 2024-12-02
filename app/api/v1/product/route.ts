import 'server-only';
import { connectDB, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { ProductCard } from '@/models';
import { ObjectId } from 'mongodb';

export const GET = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id || id === 'undefined') return errorMessage(404);

  const collection = getCollectionDb<Omit<ProductCard, '_id'>>('products');

  if (!collection) return errorMessage(500);

  const product = await collection.findOne<ProductCard>({
    _id: new ObjectId(id),
  });

  if (!product) return errorMessage(404);

  return Response.json({ success: true, payload: product });
});
