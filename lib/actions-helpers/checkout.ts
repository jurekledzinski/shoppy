'use server';

import Stripe from 'stripe';
import { Cart, ProductCard } from '@/models';
import { checkProductsInventory, getCollectionDb } from '../database';
import { errorMessageAction, getDomain } from '@/helpers';

import {
  CreateStripeSessionCheckout,
  FormatShippingData,
  ProcessCheckout,
  ValidateAndCheckInventory,
} from './types';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type ShippingOptions = Stripe.Checkout.SessionCreateParams.ShippingOption;

export const formatBuyedProducts = async (products: Cart['products']) => {
  return products.map((item) => {
    return {
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          images: [item.image],
        },
      },
      quantity: item.quantity,
    };
  });
};

export const formatShippingData: FormatShippingData = async (
  nameDelivery,
  priceDelivery,
  timeDelivery
) => {
  const shippingData: ShippingOptions[] = [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: Math.round(priceDelivery * 100),
          currency: 'eur',
        },
        display_name: nameDelivery,
        delivery_estimate: {
          maximum: {
            unit: 'business_day',
            value: timeDelivery,
          },
        },
      },
    },
  ];

  return shippingData;
};

export const createStripeSessionCheckout: CreateStripeSessionCheckout = async (
  items,
  orderID,
  shippingOptions
) => {
  const domain = await getDomain();

  const session = await stripe.checkout.sessions.create({
    line_items: [...items],
    mode: 'payment',
    payment_method_types: ['card'],
    client_reference_id: orderID,
    success_url: `${domain}/success?orderId=${orderID}`,
    cancel_url: `${domain}/cancel?orderId=${orderID}`,
    shipping_options: shippingOptions,
  });

  return session;
};

export const validateAndCheckInventory: ValidateAndCheckInventory = async (
  cartProducts
) => {
  if (!cartProducts.length) {
    return {
      success: false,
      message: "You've to add products to shopping cart",
    };
  }

  const collectionProducts = getCollectionDb<ProductCard>('products');
  if (!collectionProducts) return errorMessageAction('Internal server error');

  const inventoryCheck = await checkProductsInventory(
    collectionProducts,
    cartProducts
  );

  if (inventoryCheck && inventoryCheck.length > 0) {
    return {
      success: false,
      message: 'Some products are unavailable or in smaller quantities',
      payload: inventoryCheck,
    };
  }

  return { success: true, message: '' };
};

export const processCheckout: ProcessCheckout = async (parsedData, orderId) => {
  const formattedProducts = await formatBuyedProducts(parsedData.products);
  const shippingOptions = await formatShippingData(
    parsedData.methodDelivery,
    parsedData.priceDelivery,
    parsedData.timeDelivery
  );

  return await createStripeSessionCheckout(
    formattedProducts,
    orderId,
    shippingOptions
  );
};
