import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsOrders, getDomain } from '@/app/_helpers';
import { OrdersSection } from '@/components/pages';

type Params = Promise<{ id: string }>;

const Orders = async (props: { params: Params }) => {
  const domain = await getDomain();
  console.log('domain orders', domain);
  const params = await props.params;
  const breadcrumbs = getBreadcrumbsOrders(params.id);
  return (
    <OrdersSection>
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
