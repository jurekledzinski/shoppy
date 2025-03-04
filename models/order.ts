import { CartOrderSchema } from './cart';
import { z } from 'zod';
import { ProductCartSchema } from './product';

export const OrderSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: 'Name is required' }),
  surname: z.string({ required_error: 'Surname is required' }),
  street: z.string({ required_error: 'Street is required' }),
  postCode: z.string({ required_error: 'Post code is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
  userId: z.string().optional(),
  guestId: z.string().optional(),
  createdAt: z.date({ required_error: 'Created at is required' }),
  isPaid: z.boolean(),
  isDelivered: z.boolean(),
  isSent: z.boolean(),
  methodPayment: z.string({ required_error: 'Method payment is required' }),
  methodDelivery: z.string({ required_error: 'Method delivery is required' }),
  priceDelivery: z.number({ required_error: 'Price delivery is required' }),
  timeDelivery: z.number({ required_error: 'Time delivery is required' }),
  termsConditions: z.boolean({
    required_error: 'Terms conditions are required',
  }),
  expiryAt: z.date().optional(),
  cart: CartOrderSchema.optional(),
});

export const OrderShippingSchema = OrderSchema.pick({
  _id: true,
  name: true,
  surname: true,
  street: true,
  postCode: true,
  city: true,
  country: true,
  guestId: true,
  userId: true,
  createdAt: true,
  isPaid: true,
  expiryAt: true,
});

export const OrderPlaceOrderSchema = OrderSchema.pick({
  _id: true,
  methodDelivery: true,
  methodPayment: true,
  priceDelivery: true,
  timeDelivery: true,
  expiryAt: true,
});

export const OrderCheckoutSchema = OrderSchema.pick({
  _id: true,
  termsConditions: true,
  methodDelivery: true,
  timeDelivery: true,
  priceDelivery: true,
}).extend({
  products: z.array(ProductCartSchema, {
    required_error: 'Products are requried',
  }),
});

export const OrderSuccessSchema = OrderSchema.pick({
  cart: true,
  isPaid: true,
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderShipping = z.infer<typeof OrderShippingSchema>;
export type OrderPlaceOrder = z.infer<typeof OrderPlaceOrderSchema>;
export type OrderCheckout = z.infer<typeof OrderCheckoutSchema>;
export type OrderSuccess = z.infer<typeof OrderSuccessSchema>;
