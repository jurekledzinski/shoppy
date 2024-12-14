import { auth } from '@/auth';
import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { DetailsProductSection } from '@/components/pages';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsDetails, getDomain } from '@/app/_helpers';
import { headers } from 'next/headers';
import { Product, Review, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
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

const fetchProductReviews = tryCatch<Review[]>(async (url: string) => {
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

const fetchDetailsProduct = tryCatch<Product>(async (url: string) => {
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

  console.log('resDetailsProduct', resDetailsProduct);

  const urlGetProductReviews = `${domain}/api/v1/review?product_id=${queryId}`;
  const resReviews = await fetchProductReviews(urlGetProductReviews);

  console.log('resReviews', resReviews);

  const userHeaders = await headers();
  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  console.log('resUser', resUser);

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
