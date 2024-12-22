import { z } from 'zod';
import { ProductCartSchema } from './product';

export const CartSchema = z.object({
  _id: z.string().optional(),
  cartId: z.string().nullable(),
  userId: z.string().optional(),
  products: z.array(ProductCartSchema, {
    required_error: 'Products are requried',
  }),
  totalAmountCart: z.number({ required_error: 'Total amount is requrired' }),
  totalPriceCart: z.number({ required_error: 'Total price is required' }),
  expiredAt: z.date().optional(),
  guestId: z.string().optional(),
});

export type Cart = z.infer<typeof CartSchema>;

// guestId?:string
// timeStamp?:string
// Kiedy user process to checkout jest guest wtedy dodaje timeStamp property i to bedzie ttl index
// Potem gdy checkout click ton cart zapisany
