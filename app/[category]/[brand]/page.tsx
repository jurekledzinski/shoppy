import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {
  fetchProducts,
  getBreadcrumbsProductsPage,
  getDomain,
} from '@/app/_helpers';
import { ProductsSection } from '@/components/pages';

type Params = Promise<{ category: string; brand: string }>;

const Products = async (props: { params: Params }) => {
  const domain = await getDomain();
  const params = await props.params;
  const breadcrumbs = getBreadcrumbsProductsPage(params.category, params.brand);
  const urlGetProducts = `${domain}/api/v1/products?category=${params.category}&brand=${params.brand}`;
  const resProducts = await fetchProducts(urlGetProducts);

  return (
    <ProductsSection data={resProducts.success ? resProducts.data ?? [] : []}>
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
