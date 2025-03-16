import 'server-only';

export const endpoints = {
  brands: (domain: string) => `${domain}/api/v1/brands`,

  order: (domain: string) => `${domain}/api/v1/order`,

  orders: (domain: string) => `${domain}/api/v1/orders`,

  product: (domain: string, productId: string) =>
    `${domain}/api/v1/product?id=${productId}`,

  products: (domain: string, category: string, brand: string) =>
    `${domain}/api/v1/products?category=${category}&brand=${brand}`,

  review: (domain: string, productId: string) =>
    `${domain}/api/v1/review?product_id=${productId}`,

  user: (domain: string, userId: string) =>
    `${domain}/api/v1/user?id=${userId}`,
};
