import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProductsPage } from '@/helpers';
import { getProductsData } from '@/lib';
import { ProductsSection } from '@/components/pages';

type Params = Promise<{ category: string; brand: string }>;

const Products = async (props: { params: Params }) => {
  const params = await props.params;
  const productsData = await getProductsData(params.category, params.brand);
  const breadcrumbs = getBreadcrumbsProductsPage(params.category, params.brand);

  return (
    <ProductsSection data={productsData ? productsData : []}>
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
