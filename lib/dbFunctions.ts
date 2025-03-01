import { Cart } from '@/models';
import { ObjectId } from 'mongodb';
import {
  CartInventoryPayload,
  UpdateShipping,
  UpdatePlaceOrder,
  UpdateCheckoutOrder,
  UpdateCart,
  UpdateCartExpiryAt,
  DeleteCart,
  UpdateSuccessOrder,
  UpdateProductsQuantity,
  DeleteOrder,
  UpdateExpiryAtOrder,
  CheckProductsInventory,
  GetUserCart,
  UpdateCartProducts,
} from '@/lib';

export const updateShipping: UpdateShipping = async (
  collection,
  parsedData,
  userIdKey
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

export const updatePlaceOrder: UpdatePlaceOrder = async (
  collection,
  parsedData
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  await collection.updateOne({ _id: id }, { $set: { ...rest } });
};

export const updateCheckoutOrder: UpdateCheckoutOrder = async (
  collection,
  parsedData
) => {
  const { _id, ...rest } = parsedData;
  const id = new ObjectId(_id);

  return await collection.updateOne({ _id: id }, { $set: { ...rest } });
};

export const updateCart: UpdateCart = async (
  collection,
  parsedData,
  userIdKey
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

export const updateCartExpiryAt: UpdateCartExpiryAt = async (
  collection,
  guestId,
  expiryAt
) => {
  await collection.updateOne({ guestId }, { $set: { expiryAt } });
};

export const deleteCart: DeleteCart = async (collection, userIdKey, id) => {
  await collection.deleteOne({ [userIdKey]: id });
};

export const updateSuccessOrder: UpdateSuccessOrder = async (
  collection,
  parsedData,
  orderId
) => {
  await collection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { ...parsedData }, $unset: { expiryAt: '' } }
  );
};

export const updateProductsQuantity: UpdateProductsQuantity = async (
  collection,
  products
) => {
  const bulkOperations = products.map(({ _id, quantity }) => ({
    updateOne: {
      filter: { _id: new ObjectId(_id) },
      update: { $inc: { onStock: -quantity } },
    },
  }));

  await collection.bulkWrite(bulkOperations);
};

export const deleteOrder: DeleteOrder = async (collection, orderId) => {
  await collection.deleteOne({ _id: new ObjectId(orderId) });
};

export const updateExpiryAtOrder: UpdateExpiryAtOrder = async (
  collection,
  orderId,
  expiryAt
) => {
  await collection.updateOne(
    { _id: new ObjectId(orderId) },
    { $set: { expiryAt } }
  );
};

export const checkProductsInventory: CheckProductsInventory = async (
  collection,
  products
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

export const getUserCart: GetUserCart = async (
  collection,
  cartId,
  userId,
  userIdKey
) => {
  const result = await collection.findOne({
    cartId: { $ne: cartId },
    [userIdKey]: userId,
  });

  return result;
};

export const updateCartProducts: UpdateCartProducts = (
  dbProducts,
  newProducts
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
