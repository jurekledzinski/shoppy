'use server';
import { connectDBAction, getAuthToken, getCollectionDb } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { headers } from 'next/headers';
import { Cart, Order } from '@/models';

export const clearDataDeleteAccount = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const headersData = await headers();
    Object.fromEntries(formData);

    const token = await getAuthToken({ headers: headersData });

    if (!token) return errorMessageAction('Unauthorized');

    const userId = token.id as string;

    const collection = getCollectionDb<Omit<Cart, '_id'>>('carts');
    if (!collection) return errorMessageAction('Internal server error');

    await collection.deleteOne({ userId });

    const collectionOrders = getCollectionDb<Omit<Order, '_id'>>('orders');
    if (!collectionOrders) return errorMessageAction('Internal server error');

    await collectionOrders.deleteOne({ userId });

    return { message: 'Clear data successful', success: true };
  }
);
