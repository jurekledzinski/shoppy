import { z } from 'zod';

export const BrandSchema = z.object({
  _id: z.string().optional(),
  brand: z.string(),
  category: z.string(),
  image: z.string(),
});

export type Brand = z.infer<typeof BrandSchema>;
