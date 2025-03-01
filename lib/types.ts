import { Collection, UpdateResult } from 'mongodb';
import Stripe from 'stripe';

import {
  Cart,
  Order,
  OrderCheckout,
  OrderPlaceOrder,
  OrderShipping,
  OrderSuccess,
  ProductCard,
} from '@/models';

type ItemsData = Stripe.Checkout.SessionCreateParams.LineItem;
type ShippingOptions = Stripe.Checkout.SessionCreateParams.ShippingOption;

export type State<T> = {
  message: string;
  success: boolean;
  payload?: T;
};

export type IdPayload = { id: string };

export type CartInventoryPayload = {
  name: string;
  productId: string;
  image: string;
  onStock: number;
  cartQuantity: number;
};

export type comparePasswordsFn = (
  password: string,
  hash: string
) => Promise<boolean>;

export type createTokenFn = (
  payload: string | object,
  secret: string,
  timeExp: string
) => Promise<string>;

type UserIdKey = 'userId' | 'guestId';

export type UpdateShipping = (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderShipping,
  userIdKey: UserIdKey
) => Promise<void>;

export type UpdatePlaceOrder = (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderPlaceOrder
) => Promise<void>;

export type UpdateCheckoutOrder = (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderCheckout
) => Promise<UpdateResult>;

export type UpdateCart = (
  collection: Collection<Omit<Cart, '_id'>>,
  parsedData: Cart,
  userIdKey: UserIdKey
) => Promise<void>;

export type UpdateCartExpiryAt = (
  collection: Collection<Omit<Cart, '_id'>>,
  guestId: string,
  expiryAt: Date
) => Promise<void>;

export type DeleteCart = (
  collection: Collection<Cart>,
  userIdKey: UserIdKey,
  id: string
) => Promise<void>;

export type UpdateSuccessOrder = (
  collection: Collection<Omit<Order, '_id'>>,
  parsedData: OrderSuccess,
  orderId: string
) => Promise<void>;

export type UpdateProductsQuantity = (
  collection: Collection<Omit<ProductCard, '_id'>>,
  products: Cart['products']
) => Promise<void>;

export type DeleteOrder = (
  collection: Collection<Omit<Order, '_id'>>,
  orderId: string
) => Promise<void>;

export type UpdateExpiryAtOrder = (
  collection: Collection<Omit<Order, '_id'>>,
  orderId: string,
  expiryAt: Date
) => Promise<void>;

export type CheckProductsInventory = (
  collection: Collection<Omit<ProductCard, '_id'>>,
  products: Cart['products']
) => Promise<CartInventoryPayload[]>;

export type GetUserCart = (
  collection: Collection<Omit<Cart, '_id'>>,
  cartId: string,
  userId: string,
  userIdKey: UserIdKey
) => Promise<Omit<Cart, '_id'> | null>;

export type UpdateCartProducts = (
  dbProducts: Cart['products'],
  newProducts: Cart['products']
) => Cart['products'];

export type FormatShippingData = (
  nameDelivery: string,
  priceDelivery: number,
  timeDelivery: number
) => ShippingOptions[];

export type CreateStripeSessionCheckout = (
  items: ItemsData[],
  orderID: string,
  shippingOptions: ShippingOptions[]
) => Promise<Stripe.Response<Stripe.Checkout.Session>>;
