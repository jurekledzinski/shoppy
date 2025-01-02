import { z } from 'zod';
import { ProductCartSchema } from './product';

export const CartSchema = z.object({
  _id: z.string().optional(),
  cartId: z.string().nullable(),
  expiredAt: z.date().optional(),
  products: z.array(ProductCartSchema, {
    required_error: 'Products are requried',
  }),
  totalAmountCart: z.number({ required_error: 'Total amount is requrired' }),
  totalPriceCart: z.number({ required_error: 'Total price is required' }),
  guestId: z.string().optional(),
  userId: z.string().optional(),
});

export type Cart = z.infer<typeof CartSchema>;
