import { z } from 'zod';

export const ReviewSchema = z.object({
  _id: z.string().optional(),
  review: z.string({ required_error: 'Review is required' }),
  rate: z.number({ required_error: 'Rate is required' }),
  userId: z.string({ required_error: 'User id is required' }),
  userName: z.string({ required_error: 'User name is required' }),
  productId: z.string({ required_error: 'Product id is required' }),
});

export type Review = z.infer<typeof ReviewSchema>;
