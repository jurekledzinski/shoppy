import { auth } from '@/auth';
import { PlaceOrderSection } from '@/components/pages';

type SearchParams = Promise<{ orderId: string }>;

const PlaceOrder = async (props: { searchParams: SearchParams }) => {
  const session = await auth();
  const searchParams = await props.searchParams;
  //   const orderId = searchParams.orderId;
  console.log('searchParams PlaceOrder page', searchParams);

  const orderId = searchParams.orderId;
  console.log('orderId', orderId);
  console.log('session PlaceOrder page', session);

  return <PlaceOrderSection userData={[]}>PlaceOrder page</PlaceOrderSection>;
};

export default PlaceOrder;
