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
import { CartInventoryPayload } from '@/lib';

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
  const { cartId, ...rest } = parsedData;
  const updateData = { ...rest };
  delete updateData._id;

  if (rest.totalAmountCart) {
    await collection.updateOne(
      { cartId },
      {
        $set: {
          ...updateData,
          ...(rest[userIdKey as keyof typeof rest] && {
            [userIdKey]: rest[userIdKey as keyof typeof rest],
          }),
        },
      },
      { upsert: true }
    );
  } else {
    await collection.deleteOne({ cartId });
  }
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

export const checkProductsInventory = async (
  collection: Collection<Omit<ProductCard, '_id'>>,
  products: Cart['products']
) => {
  const cartWithObjectId = products.map((item) => ({
    productId: new ObjectId(item._id),
    quantity: item.quantity,
  }));

  const pipeline = [
    {
      $match: {
        _id: { $in: cartWithObjectId.map((item) => item.productId) },
      },
    },
    {
      $addFields: {
        cartQuantity: {
          $reduce: {
            input: cartWithObjectId,
            initialValue: 0,
            in: {
              $cond: [
                { $eq: ['$$this.productId', '$_id'] },
                '$$this.quantity',
                '$$value',
              ],
            },
          },
        },
      },
    },
    {
      $match: {
        $expr: { $gt: ['$cartQuantity', '$onStock'] },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$name',
        productId: '$_id',
        onStock: 1,
        cartQuantity: 1,
        image: { $arrayElemAt: ['$images', 0] },
      },
    },
  ];

  const result = await collection
    .aggregate<CartInventoryPayload>(pipeline)
    .toArray();

  return result.map((product) => ({
    ...product,
    productId: product.productId.toString(),
  }));
};

export const getUserCart = async (
  collection: Collection<Omit<Cart, '_id'>>,
  cartId: string,
  userId: string,
  userIdKey: 'userId' | 'guestId'
) => {
  return await collection.findOne({
    cartId: { $ne: cartId },
    [userIdKey]: userId,
  });
};

export const updateCartProducts = (
  dbProducts: Cart['products'],
  newProducts: Cart['products']
) => {
  const allProducts = dbProducts.concat(newProducts);
  const products: Cart['products'] = [];

  for (const product of allProducts) {
    const foundIndex = products.findIndex((item) => item._id === product._id);

    if (foundIndex >= 0) {
      products[foundIndex].quantity += product.quantity;
    } else {
      products.push(product);
    }
  }

  return products;
};

export const updateCartTotalAmount = (updatedProducts: Cart['products']) => {
  const totalAmountIncreaseCart = updatedProducts.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  return totalAmountIncreaseCart;
};

export const updateCartTotalPrice = (updatedProducts: Cart['products']) => {
  const totalPriceIncreaseCart = updatedProducts.reduce(
    (acc, product) => acc + product.quantity * product.price,
    0
  );
  return totalPriceIncreaseCart;
};
