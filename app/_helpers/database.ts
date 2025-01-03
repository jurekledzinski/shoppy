import { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';
import {
  Cart,
  Order,
  OrderCheckout,
  OrderPlaceOrder,
  OrderShipping,
} from '@/models';

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

export const updatePlaceOrder = async (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderPlaceOrder
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  await collection.updateOne({ _id: id }, { $set: { ...rest } });
};

export const updateCheckoutOrder = async (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderCheckout
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  await collection.updateOne({ _id: id }, { $set: { ...rest } });
};

export const updateCart = async (
  collection: Collection<Omit<Cart, '_id'>>,
  parsedData: Cart,
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
