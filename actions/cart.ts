'use server';
import { Cart, CartSchema, ProductCard } from '@/models';
import { Collection } from 'mongodb';
import { cookies, headers } from 'next/headers';
import { errorMessageAction } from '@/helpers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { revalidateTag } from 'next/cache';

import {
  checkProductsInventory,
  getUserCart,
  setCookieGuestId,
  setCookieStepper,
  updateCart,
  updateCartProducts,
  updateCartTotalAmount,
  updateCartTotalPrice,
} from '@/app/_helpers';

import {
  connectDBAction,
  createToken,
  getAuthToken,
  getCollectionDb,
  verifyToken,
} from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;
const expireGuestToken = process.env.EXPIRE_GUEST_TOKEN!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

export const cart = connectDBAction<Cart>(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
    const headersData = await headers();
    const cookieGuest = cookieStore.get('guestId');
    const cookieStepper = cookieStore.get('stepper');
    const body = Object.fromEntries(formData);
    const cart = JSON.parse(body.cart as string);

    const token = await getAuthToken({ headers: headersData });

    const parsedData = CartSchema.parse({
      ...cart,
      ...(body.userId && { userId: body.userId }),
      ...(body.guestId && { guestId: body.guestId }),
      ...(body.expiryAt && { expiryAt: new Date(body.expiryAt as string) }),
    });

    if (!token && !cookieGuest && !cookieStepper) {
      return errorMessageAction('Unauthorized');
    }

    const collection = getCollectionDb<Omit<Cart, '_id'>>('carts');
    if (!collection) return errorMessageAction('Internal server error');

    const expiresIn = new Date(Date.now() + 30 * 60 * 1000);

    if (!token && cookieGuest && cookieStepper) {
      const dataStepper = await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      const tokenStepper = await createToken(
        dataStepper.payload.value,
        secretStepper,
        expireStepperToken
      );

      const dataGuest = await verifyToken<{ value: string }>(
        cookieGuest.value,
        secretGuest
      );

      const tokenGuest = await createToken(
        dataGuest.payload.value,
        secretGuest,
        expireGuestToken
      );

      return processCartUpdate(
        collection,
        parsedData,
        'guestId',
        cookieStore,
        expiresIn,
        tokenStepper,
        tokenGuest
      );
    }

    if (token && !cookieGuest && cookieStepper) {
      const dataStepper = await verifyToken<{
        value: { allowed: string; completed: string[] };
      }>(cookieStepper.value, secretStepper);

      const tokenStepper = await createToken(
        dataStepper.payload.value,
        secretStepper,
        expireStepperToken
      );

      return processCartUpdate(
        collection,
        parsedData,
        'userId',
        cookieStore,
        expiresIn,
        tokenStepper
      );
    }

    if (token && !cookieGuest && !cookieStepper) {
      return processCartUpdate(
        collection,
        parsedData,
        'userId',
        cookieStore,
        expiresIn
      );
    }

    return errorMessageAction('Unauthorized');
  }
);

async function processCartUpdate(
  collection: Collection<Omit<Cart, '_id'>>,
  parsedData: Cart,
  userIdKey: 'userId' | 'guestId',
  cookieStore: ReadonlyRequestCookies,
  expiresIn: Date,
  tokenStepper?: string,
  tokenGuest?: string
) {
  const existingCart = await getUserCart(
    collection,
    parsedData.cartId!,
    parsedData[userIdKey]!,
    userIdKey
  );

  if (existingCart) {
    const updatedProducts = updateCartProducts(
      existingCart.products,
      parsedData.products
    );
    const totalAmount = updateCartTotalAmount(updatedProducts);
    const totalPrice = updateCartTotalPrice(updatedProducts);

    const newCart = {
      cartId: existingCart.cartId,
      products: updatedProducts,
      totalAmountCart: totalAmount,
      totalPriceCart: totalPrice,
      userId: existingCart.userId,
    };

    const collectionProducts = getCollectionDb<ProductCard>('products');
    if (!collectionProducts) return errorMessageAction('Internal server error');

    const inventoryIssues = await checkProductsInventory(
      collectionProducts,
      updatedProducts
    );

    if (inventoryIssues.length) {
      newCart.products = updatedProducts.map((product) => {
        const issue = inventoryIssues.find(
          (item) => item.productId === product._id
        );
        return issue ? { ...product, quantity: issue.onStock } : product;
      });
      newCart.totalAmountCart = updateCartTotalAmount(newCart.products);
      newCart.totalPriceCart = updateCartTotalPrice(newCart.products);
    }

    await updateCart(collection, newCart, userIdKey);

    if (tokenGuest) setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    if (tokenStepper) setCookieStepper(cookieStore, tokenStepper, expiresIn);

    revalidateTag('get_products');

    return {
      message: 'Cart updated successfully',
      success: true,
      payload: newCart,
    };
  } else {
    await updateCart(collection, parsedData, userIdKey);

    if (tokenGuest) setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    if (tokenStepper) setCookieStepper(cookieStore, tokenStepper, expiresIn);

    revalidateTag('get_products');

    return {
      message: 'Cart updated successfully continue',
      success: true,
      payload: parsedData,
    };
  }
}
