import { Order, OrderShipping } from '@/models';
import { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';

export const updateShipping = async (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderShipping,
  userIdKey: 'userId' | 'guestId'
) => {
  const id = new ObjectId(parsedData._id);

  await collection.updateOne(
    { _id: id },
    {
      $set: {
        ...parsedData,
        ...(parsedData[userIdKey as keyof typeof parsedData] && {
          [userIdKey]: parsedData[userIdKey as keyof typeof parsedData],
        }),
      },
    },
    { upsert: true }
  );
};
