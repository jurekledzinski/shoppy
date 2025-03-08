'use server';

import { setCookieGuestId } from '../authentication';

import {
  ProcessCartUpdate,
  UpdateCartBaseOnInventoryIssue,
  UpdateDbCart,
} from './types';

import {
  checkProductsInventory,
  getUserCart,
  updateCart,
  updateCartProducts,
  updateCartTotalAmount,
  updateCartTotalPrice,
} from '../database';

const updateDbCart: UpdateDbCart = async (dbCart, cartData) => {
  const updatedProducts = updateCartProducts(
    dbCart.products,
    cartData.products
  );

  const newCart = {
    ...dbCart,
    _id: dbCart._id?.toString(),
    products: updatedProducts,
    totalAmountCart: updateCartTotalAmount(updatedProducts),
    totalPriceCart: updateCartTotalPrice(updatedProducts),
  };

  return newCart;
};

const updateCartBaseOnInventoryIssue: UpdateCartBaseOnInventoryIssue = async (
  newCart,
  inventoryIssues
) => {
  const updatedCartProducts = newCart.products.map((product) => {
    const issue = inventoryIssues.find(
      (item) => item.productId === product._id
    );
    return issue ? { ...product, quantity: issue.onStock } : product;
  });

  newCart.products = updatedCartProducts;
  newCart.totalAmountCart = updateCartTotalAmount(newCart.products);
  newCart.totalPriceCart = updateCartTotalPrice(newCart.products);

  return newCart;
};

export const processCartUpdate: ProcessCartUpdate = async (
  collectionCarts,
  collectionProducts,
  cartData,
  userIdKey,
  cookieStore,
  expiresIn,
  tokenGuest
) => {
  const dbCart = await getUserCart(
    collectionCarts,
    cartData.cartId!,
    cartData[userIdKey]!,
    userIdKey
  );

  let newCart = dbCart ? await updateDbCart(dbCart, cartData) : cartData;

  const updatedProducts = newCart.products;

  const inventoryIssues = await checkProductsInventory(
    collectionProducts,
    updatedProducts
  );

  if (inventoryIssues.length) {
    newCart = await updateCartBaseOnInventoryIssue(newCart, inventoryIssues);

    await updateCart(collectionCarts, newCart, userIdKey);
    if (tokenGuest) setCookieGuestId(cookieStore, tokenGuest, expiresIn!);

    return newCart;
  } else {
    await updateCart(collectionCarts, newCart, userIdKey);
    if (tokenGuest) setCookieGuestId(cookieStore, tokenGuest, expiresIn!);

    return newCart;
  }
};
