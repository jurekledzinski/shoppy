import { auth } from '@/auth';
import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { DetailsProductSection } from '@/components/pages';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchDetailsProduct, fetchProductReviews, fetchUser } from '@/lib';
import { getBreadcrumbsDetails, getDomain } from '@/helpers';
import { headers } from 'next/headers';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

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

  const resDetailsProduct = await fetchDetailsProduct(urlGetProduct);

  const urlGetProductReviews = `${domain}/api/v1/review?product_id=${queryId}`;
  const resReviews = await fetchProductReviews(urlGetProductReviews);

  const userHeaders = await headers();
  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  return (
    <DetailsProductSection
      dataProduct={resDetailsProduct.success ? resDetailsProduct.data : null}
      dataReviews={resReviews.success ? resReviews.data : []}
      dataUser={resUser && resUser.success ? resUser.data : null}
      {...(!resReviews.success && {
        errorReviews: resReviews,
      })}
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
