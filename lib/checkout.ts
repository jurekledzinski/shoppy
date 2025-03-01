import Stripe from 'stripe';
import { Cart } from '@/models';
import { CreateStripeSessionCheckout, FormatShippingData } from './types';
import { getDomain } from '@/helpers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type ShippingOptions = Stripe.Checkout.SessionCreateParams.ShippingOption;

export const formatBuyedProducts = (products: Cart['products']) => {
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

export const formatShippingData: FormatShippingData = (
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
