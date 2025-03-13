import 'server-only';
import { connectDB, getCollectionDb } from '@/lib';
import { errorMessage } from '@/helpers';
import { Brand } from '@/models';

export const GET = connectDB(async () => {
  const collection = getCollectionDb<Brand>('brands');

  if (!collection) return errorMessage(500);

  const brands = await collection.find<Brand>({}).toArray();

  if (!brands) return errorMessage(404);

  return Response.json({ success: true, payload: brands });
});
