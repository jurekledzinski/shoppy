import 'server-only';
import { connectDB, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { NextRequest } from 'next/server';
import { Brand } from '@/models';

export const GET = connectDB(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category || category === 'undefined') return errorMessage(404);

  const collection = getCollectionDb<Brand>('brands');

  if (!collection) return errorMessage(500);

  const brands = await collection.find<Brand>({ category }).toArray();

  if (!brands) return errorMessage(404);

  return Response.json({ success: true, payload: brands });
});
