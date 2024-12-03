type WithQuery = { name: string; path: string; query?: string };

const paths = {
  home: { name: 'Home', path: '/' },
  category: (category: string, brand: string) => ({
    name: `${category.charAt(0).toUpperCase() + category.slice(1)} ${brand}`,
    path: `/${category}/${brand}`,
  }),
  detailsProduct: (segments: string[]) => {
    const [category, brand, model, id] = segments;
    return {
      name: decodeURIComponent(model.replace(/-/g, ' ')),
      path: `/${category}/${brand}/${model}`,
      query: `?id=${id}`,
    };
  },
  profileUser: (id: string) => ({
    name: 'User profile',
    path: `/profile/${id}`,
  }),
  ordersUser: (id: string) => ({
    name: 'User orders',
    path: `/orders/${id}`,
  }),
};

export const getBreadcrumbsProductsPage = (category: string, brand: string) => {
  return [paths['home'], paths['category'](category, brand)];
};

export const getBreadcrumbsDetails = (segments: string[]): WithQuery[] => {
  const [category, brand, model, id] = segments;
  return [
    paths['home'],
    paths['category'](category, brand),
    paths['detailsProduct']([category, brand, model, id]),
  ];
};

export const getBreadcrumbsProfile = (id: string) => {
  return [paths['home'], paths['profileUser'](id)];
};

export const getBreadcrumbsOrders = (id: string) => {
  return [paths['home'], paths['ordersUser'](id)];
};
