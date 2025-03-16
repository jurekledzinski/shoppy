import { Order, Product, Review, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { Session } from 'next-auth';

export type GetUserData = (
  session: Session | null,
  domain: string,
  headersData: ReadonlyHeaders
) => Promise<Omit<UserRegister, 'password'> | null>;

export type GetOrderData = (
  isAuthorized: boolean,
  domain: string,
  headersData: ReadonlyHeaders
) => Promise<Order | null>;

export type GetProductsData = (
  domain: string,
  category: string,
  brand: string
) => Promise<Product[] | null>;

export type GetProductData = (
  domain: string,
  productId: string
) => Promise<Product | null>;

export type GetReviewData = (
  domain: string,
  productId: string
) => Promise<Review[] | null>;
