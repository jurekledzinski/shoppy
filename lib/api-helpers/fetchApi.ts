import { tryCatch } from '@/helpers';
import { Brand, Order, Product, Review, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const fetchOrder = tryCatch<Order>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const formattedHeaders = formatHeaders(headers);

    const response = await fetch(url, {
      method: 'GET',
      headers: formattedHeaders,
      next: { tags: ['get_order'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

export const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const formattedHeaders = formatHeaders(headers);

    const response = await fetch(url, {
      method: 'GET',
      headers: formattedHeaders,
      next: { tags: ['get_user'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

export const fetchBrands = tryCatch<Brand[]>(async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

export const fetchProducts = tryCatch<Product[]>(async (url: string) => {
  const response = await fetch(url, {
    next: { tags: ['get_products'] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

export const fetchProductReviews = tryCatch<Review[]>(async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['get_product_reviews'] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

export const fetchDetailsProduct = tryCatch<Product>(async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { tags: ['get_products'] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});

export const fetchUserOrders = tryCatch<Order[]>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const formattedHeaders = formatHeaders(headers);

    const response = await fetch(url, {
      method: 'GET',
      headers: formattedHeaders,
      next: { tags: ['get_user_orders'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
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
