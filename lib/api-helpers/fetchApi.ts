import { Brand, Order, Product, Review, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';

export const fetchOrder = tryCatch<Order>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const options = getOptions(['get_order'], headers);
    const response = await fetch(url, options);
    return fetchResponse(response);
  }
);

export const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const options = getOptions(['get_user'], headers);
    const response = await fetch(url, options);
    return fetchResponse(response);
  }
);

export const fetchBrands = tryCatch<Brand[]>(async (url: string) => {
  const response = await fetch(url, {
    cache: 'force-cache',
  });

  return fetchResponse(response);
});

export const fetchProducts = tryCatch<Product[]>(async (url: string) => {
  const options = getOptions(['get_products']);
  const response = await fetch(url, options);
  return fetchResponse(response);
});

export const fetchProductReviews = tryCatch<Review[]>(async (url: string) => {
  const options = getOptions(['get_product_reviews']);
  const response = await fetch(url, options);
  return fetchResponse(response);
});

export const fetchDetailsProduct = tryCatch<Product>(async (url: string) => {
  const options = getOptions(['get_products']);
  const response = await fetch(url, options);
  return fetchResponse(response);
});

export const fetchUserOrders = tryCatch<Order[]>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const options = getOptions(['get_user_orders'], headers);
    const response = await fetch(url, options);
    return fetchResponse(response);
  }
);

function formatHeaders(headers?: ReadonlyHeaders) {
  const formattedHeader =
    process.env.NODE_ENV === 'development'
      ? headers
      : headers
      ? Object.fromEntries(Array.from(headers.entries()))
      : {};

  return formattedHeader;
}

async function fetchResponse(response: Response) {
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
}

function getOptions(tags?: string[], headers?: ReadonlyHeaders) {
  const formattedHeaders = formatHeaders(headers);

  const options = {
    ...(tags && { next: { tags } }),
    ...(formattedHeaders && { headers: formattedHeaders }),
    ...(!formattedHeaders && {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  };

  return options;
}
