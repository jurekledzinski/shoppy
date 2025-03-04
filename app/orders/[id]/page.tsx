import { auth } from '@/auth';
import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { fetchUserOrders } from '@/lib';
import { getBreadcrumbsOrders, getDomain } from '@/helpers';
import { headers } from 'next/headers';
import { OrdersSection } from '@/components/pages';

type Params = Promise<{ id: string }>;

const Orders = async (props: { params: Params }) => {
  const session = await auth();
  const domain = await getDomain();
  const allHeaders = await headers();
  const params = await props.params;
  const breadcrumbs = getBreadcrumbsOrders(params.id);

  const urlGetUserOrders = `${domain}/api/v1/orders`;

  const resOrders = session
    ? await fetchUserOrders(urlGetUserOrders, allHeaders)
    : null;

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
