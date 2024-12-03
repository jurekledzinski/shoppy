import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ProductDetailsSection } from '@/components/pages';
import { getDomain, getBreadcrumbsDetails } from '@/app/_helpers';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

const fetchDetailsProduct = async (url: string) => {
  const response = await fetch(url, { cache: 'force-cache' });
  return response;
};

const DetailsProduct = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const domain = await getDomain();
  const { brand, category, model } = await props.params;
  const queryId = (await props.searchParams).id;
  const breadcrumbs = getBreadcrumbsDetails([category, brand, model, queryId]);
  const urlGetProduct = `${domain}/api/v1/product?id=${queryId}`;
  const response = await fetchDetailsProduct(urlGetProduct);
  const data = await response.json();

  console.log('data details product', data);
  return (
    <ProductDetailsSection data={[]}>
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
              query={segment.query}
            />
          );
        })}
      </Breadcrumbs>
    </ProductDetailsSection>
  );
};

export default DetailsProduct;
