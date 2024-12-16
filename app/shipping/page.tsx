type SearchParams = Promise<{ userId: string; orderId: string }>;

const Shipping = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  //   const userId = searchParams.userId;
  //   const orderId = searchParams.orderId;
  console.log('searchParams shipping page', searchParams);

  return <div>Shipping page</div>;
};

export default Shipping;
