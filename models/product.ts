import { z } from 'zod';

export const ProductSchema = z.object({
  _id: z.string({ required_error: 'Product id is required' }).optional(),
  brand: z.string({ required_error: 'Brand name is required' }),
  category: z.string({ required_error: 'Category name is required' }),
  description: z.string({ required_error: 'Description is required' }),
  images: z.array(z.string(), { required_error: 'Images are required' }),
  name: z.string({ required_error: 'Name is required' }),
  onStock: z.number({ required_error: 'Amount on stock is required' }),
  price: z.number({ required_error: 'Price is required' }),
  rate: z.number({ required_error: 'Rate is required' }),
  specification: z.array(z.record(z.string())),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductCartSchema = ProductSchema.pick({
  _id: true,
  name: true,
  price: true,
  onStock: true,
}).extend({
  quantity: z.number(),
  image: z.string(),
});

export type ProductCart = z.infer<typeof ProductCartSchema>;
export type ProductCard = Omit<Product, 'description' | 'specification'>;
