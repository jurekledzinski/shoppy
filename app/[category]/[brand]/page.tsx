import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProductsPage, getDomain } from '@/app/_helpers';
import { ProductsSection } from '@/components/pages';

type Params = Promise<{ category: string; brand: string }>;

const fetchProducts = async (url: string) => {
  const response = await fetch(url, {
    cache: 'force-cache',
    next: { tags: ['get_product'] },
  });
  return response;
};

const Products = async (props: { params: Params }) => {
  const domain = await getDomain();
  const params = await props.params;
  const breadcrumbs = getBreadcrumbsProductsPage(params.category, params.brand);
  const urlGetProducts = `${domain}/api/v1/products?category=${params.category}&brand=${params.brand}`;
  const response = await fetchProducts(urlGetProducts);
  const products = await response.json();

  return (
    <ProductsSection data={response.ok ? products.payload : []}>
      <Breadcrumbs>
        {breadcrumbs.map((segment, index) => {
          return (
            <Breadcrumb
              key={segment.name}
              text={segment.name}
              path={segment.path}
              {...(index !== breadcrumbs.length - 1 && {
                icon: faChevronRight,
              })}
            />
          );
        })}
      </Breadcrumbs>
    </ProductsSection>
  );
};

export default Products;
