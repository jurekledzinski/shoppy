import { tryCatch } from '@/helpers';
import { Brand, Cart, Order, Product, Review, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const fetchCart = tryCatch<Cart>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_cart'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

export const fetchOrder = tryCatch<Order>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_order'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

export const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_user'] },
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
    next: { revalidate: 3600, tags: ['get_product'] },
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
    next: { revalidate: 3600, tags: ['get_product_reviews'] },
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
    next: { revalidate: 3600, tags: ['get_product'] },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
});