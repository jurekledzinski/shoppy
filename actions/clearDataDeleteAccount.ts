'use server';
import { connectDBAction, getCollectionDb, getSessionData } from '@/lib';
import { errorMessageAction } from '@/helpers';
import { Cart, Order } from '@/models';

export const clearDataDeleteAccount = connectDBAction(
  async (prevState: unknown, formData: FormData) => {
    const { token } = await getSessionData();

    Object.fromEntries(formData);

    if (!token) return errorMessageAction('Unauthorized');

    const userId = token.id as string;

    const collectionCarts = getCollectionDb<Omit<Cart, '_id'>>('carts');
    const collectionOrders = getCollectionDb<Omit<Order, '_id'>>('orders');

    if (!collectionCarts || !collectionOrders)
      return errorMessageAction('Internal server error');

    await collectionCarts.deleteOne({ userId });
    await collectionOrders.deleteMany({ userId });

    return { message: 'Clear data successful', success: true };
  }
);
