type SearchParams = Promise<{ userId: string; orderId: string }>;

const PlaceOrder = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  //   const userId = searchParams.userId;
  //   const orderId = searchParams.orderId;
  console.log('searchParams PlaceOrder page', searchParams);

  return <div>PlaceOrder page</div>;
};

export default PlaceOrder;
