import 'server-only';
import { connectDB, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { ProductCard } from '@/models';

export const GET = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');

  if (!category || category === 'undefined') return errorMessage(404);
  if (!brand || brand === 'undefined') return errorMessage(404);

  const collection = getCollectionDb<ProductCard>('products');

  if (!collection) return errorMessage(500);

  const products = await collection
    .find<ProductCard>({ category, brand })
    .toArray();

  if (!products) return errorMessage(404);

  return Response.json({ success: true, payload: products });
});
