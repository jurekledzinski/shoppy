import { auth } from '@/auth';
import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { DetailsProductSection } from '@/components/pages';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsDetails, getDomain } from '@/app/_helpers';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

const fetchProductReviews = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });
  return response;
};

const fetchDetailsProduct = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'force-cache',
  });
  return response;
};

const DetailsProduct = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const session = await auth();
  const domain = await getDomain();

  const { brand, category, model } = await props.params;
  const queryId = (await props.searchParams).id;

  const breadcrumbs = getBreadcrumbsDetails([category, brand, model, queryId]);

  const urlGetProduct = `${domain}/api/v1/product?id=${queryId}`;
  const urlGetProductReviews = `${domain}/api/v1/review?product_id=${queryId}`;

  const resDetailsProduct = await fetchDetailsProduct(urlGetProduct);
  const dataProduct = await resDetailsProduct.json();

  const resReviews = await fetchProductReviews(urlGetProductReviews);
  const dataReviews = await resReviews.json();

  if (session && session.user) {
    session.user = { id: session.user.id, name: session.user.name };
  }

  return (
    <DetailsProductSection
      dataProduct={resDetailsProduct.ok ? dataProduct.payload : { images: [] }}
      dataReviews={resReviews.ok ? dataReviews.payload : []}
      dataUser={session}
    >
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
    </DetailsProductSection>
  );
};

export default DetailsProduct;
