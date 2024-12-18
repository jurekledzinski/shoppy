import { z } from 'zod';

export const OrderSchema = z.object({
  _id: z.string().optional(),
  name: z.string({ required_error: 'Name is required' }),
  surname: z.string({ required_error: 'Surname is required' }),
  street: z.string({ required_error: 'Street is required' }),
  postCode: z.string({ required_error: 'Post code is required' }),
  city: z.string({ required_error: 'City is required' }),
  country: z.string({ required_error: 'Country is required' }),
});

export const OrderShippingSchema = OrderSchema.pick({
  _id: true,
  name: true,
  surname: true,
  street: true,
  postCode: true,
  city: true,
  country: true,
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderShipping = z.infer<typeof OrderShippingSchema>;
