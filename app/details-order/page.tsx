type SearchParams = Promise<{ userId: string; orderId: string }>;

const DetailsOrder = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  //   const userId = searchParams.userId;
  //   const orderId = searchParams.orderId;
  console.log('searchParams DetailsOrder page', searchParams);

  return <div>DetailsOrder page</div>;
};

export default DetailsOrder;
