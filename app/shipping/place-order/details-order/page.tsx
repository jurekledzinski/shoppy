import { auth } from '@/auth';
import { DetailsOrderSection } from '@/components/pages';

type SearchParams = Promise<{ orderId: string }>;

const DetailsOrder = async (props: { searchParams: SearchParams }) => {
  const session = await auth();
  const searchParams = await props.searchParams;
  //   const orderId = searchParams.orderId;
  console.log('searchParams DetailsOrder page', searchParams);

  const orderId = searchParams.orderId;
  console.log('orderId', orderId);
  console.log('session shipping page', session);

  return (
    <DetailsOrderSection userData={[]}>DetailsOrder page</DetailsOrderSection>
  );
};

export default DetailsOrder;
