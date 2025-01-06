import { Collection } from 'mongodb';
import { ObjectId } from 'mongodb';
import {
  Cart,
  Order,
  OrderCheckout,
  OrderPlaceOrder,
  OrderShipping,
  OrderSuccess,
  ProductCard,
} from '@/models';

export const updateShipping = async (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderShipping,
  userIdKey: 'userId' | 'guestId'
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  await collection.updateOne(
    { _id: id },
    {
      $set: {
        ...rest,
        ...(rest[userIdKey as keyof typeof rest] && {
          [userIdKey]: rest[userIdKey as keyof typeof rest],
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

  return await collection.updateOne({ _id: id }, { $set: { ...rest } });
};

export const updateCart = async (
  collection: Collection<Omit<Cart, '_id'>>,
  parsedData: Cart,
  userIdKey: 'userId' | 'guestId'
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  await collection.updateOne(
    { _id: id },
    {
      $set: {
        ...rest,
        ...(rest[userIdKey as keyof typeof rest] && {
          [userIdKey]: rest[userIdKey as keyof typeof rest],
        }),
      },
    },
    { upsert: true }
  );
};

export const updateCartExpiryAt = async (
  collection: Collection<Omit<Cart, '_id'>>,
  guestId: string,
  expiryAt: Date
) => {
  await collection.updateOne({ guestId }, { $set: { expiryAt } });
};

export const deleteCart = async (
  collection: Collection<Cart>,
  userIdKey: 'userId' | 'guestId',
  id: string
) => {
  await collection.deleteOne({ [userIdKey]: id });
};

export const updateSuccessOrder = async (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderSuccess,
  orderId: string
) => {
  await collection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { ...parsedData }, $unset: { expiryAt: '' } }
  );
};

export const updateProductsQuantity = async (
  collection: Collection<Omit<ProductCard, '_id'>>,
  products: Cart['products']
) => {
  const bulkOperations = products.map(({ _id, quantity }) => ({
    updateOne: {
      filter: { _id: new ObjectId(_id) },
      update: { $inc: { onStock: -quantity } },
    },
  }));

  await collection.bulkWrite(bulkOperations);
};

export const deleteOrder = async (
  collection: Collection<Omit<Order, '_id'>>,
  orderId: string
) => {
  await collection.deleteOne({ _id: new ObjectId(orderId) });
};

export const updateExpiryAtOrder = async (
  collection: Collection<Omit<Order, '_id'>>,
  orderId: string,
  expiryAt: Date
) => {
  await collection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { expiryAt } }
  );
};
