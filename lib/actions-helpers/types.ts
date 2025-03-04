import Stripe from 'stripe';
import { Cart, OrderCheckout, ProductCard, ProductCart } from '@/models';
import { CartInventoryPayload } from '../database';
import { Collection } from 'mongodb';
import { JWTVerifyResult } from 'jose';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

type ItemsData = Stripe.Checkout.SessionCreateParams.LineItem;
type ShippingOptions = Stripe.Checkout.SessionCreateParams.ShippingOption;

export type FormatShippingData = (
  nameDelivery: string,
  priceDelivery: number,
  timeDelivery: number
) => Promise<ShippingOptions[]>;

export type CreateStripeSessionCheckout = (
  items: ItemsData[],
  orderID: string,
  shippingOptions: ShippingOptions[]
) => Promise<Stripe.Response<Stripe.Checkout.Session>>;

export type IdPayload = { id: string };

export type VerifyGuestUser = (
  cookieGuest: RequestCookie,
  secretGuest: string
) => Promise<string | null>;

export type VerifyStepper = (
  cookieStepper: RequestCookie | undefined,
  secretStepper: string
) => Promise<JWTVerifyResult<{
  value: {
    allowed: string;
    completed: string[];
  };
}> | null>;

export type ValidateAndCheckInventory = (
  cartProducts: ProductCart[]
) => Promise<
  | {
      message: string;
      success: boolean;
    }
  | {
      success: boolean;
      message: string;
      payload: CartInventoryPayload[];
    }
>;

export type ProcessCheckout = (
  parsedData: OrderCheckout,
  orderId: string
) => Promise<Stripe.Response<Stripe.Checkout.Session>>;

export type UpdateCookies = (
  cookieStore: ReadonlyRequestCookies,
  tokenGuest?: string,
  tokenStepper?: string,
  expiresIn?: Date
) => void;

export type ProcessCartUpdate = (
  collectionCarts: Collection<Omit<Cart, '_id'>>,
  collectionProducts: Collection<ProductCard>,
  cartData: Cart,
  userIdKey: 'userId' | 'guestId',
  cookieStore: ReadonlyRequestCookies,
  expiresIn: Date,
  tokenGuest?: string
) => Promise<Cart>;

export type UpdateCartBaseOnInventoryIssue = (
  newCart: Cart,
  inventoryIssues: CartInventoryPayload[]
) => Promise<Cart>;

export type UpdateDbCart = (
  dbCart: Omit<Cart, '_id'>,
  cartData: Cart
) => Promise<Cart>;
