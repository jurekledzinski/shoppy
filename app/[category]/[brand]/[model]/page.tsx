import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { DetailsProductSection } from '@/components/pages';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsDetails } from '@/helpers';
import { getDetailsProductData } from '@/lib';

type Params = Promise<{ category: string; brand: string; model: string }>;
type SearchParams = Promise<{ id: string }>;

const DetailsProduct = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const { brand, category, model } = await props.params;
  const productId = (await props.searchParams).id;

  const { productData, reviewData, userData } = await getDetailsProductData(
    productId
  );

  const breadcrumbs = getBreadcrumbsDetails([
    category,
    brand,
    model,
    productId,
  ]);

  return (
    <DetailsProductSection
      dataProduct={productData ? productData : null}
      dataReviews={reviewData ? reviewData : []}
      dataUser={userData ? userData : null}
      {...(!reviewData && {
        errorReviews: "Couldn't fetch reviews, please try later.",
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
