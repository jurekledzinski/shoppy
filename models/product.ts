import { z } from 'zod';

export const ProductSchema = z.object({
  _id: z.string({ required_error: 'Product id is required' }),
  brand: z.string({ required_error: 'Brand name is required' }),
  category: z.string({ required_error: 'Category name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  images: z.array(z.string(), { required_error: 'Images are required' }),
  name: z.string({ required_error: 'Name is required' }),
  onStock: z.number({ required_error: 'Amount on stock is required' }),
  price: z.number({ required_error: 'Price is required' }),
  rate: z.number({ required_error: 'Rate is required' }),
  details: z.array(z.object({}), { required_error: 'Details are required' }),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductCartSchema = ProductSchema.pick({
  _id: true,
  name: true,
  price: true,
  onStock: true,
  images: true,
}).extend({
  quantity: z.number(),
});

export type ProductCart = z.infer<typeof ProductCartSchema>;
