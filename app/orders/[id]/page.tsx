import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { endpoints, fetchUserOrders, getSessionData } from '@/lib';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsOrders, getDomain } from '@/helpers';
import { OrdersSection } from '@/components/pages';

type Params = Promise<{ id: string }>;

const Orders = async (props: { params: Params }) => {
  const { session, headersData } = await getSessionData();
  const domain = await getDomain();
  const params = await props.params;

  const resOrders = session
    ? await fetchUserOrders(endpoints.orders(domain), headersData)
    : null;

  const breadcrumbs = getBreadcrumbsOrders(params.id);

  return (
    <OrdersSection
      ordersData={resOrders && resOrders.success ? resOrders.data : null}
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
            />
          );
        })}
      </Breadcrumbs>
    </OrdersSection>
  );
};

export default Orders;
