import { SectionCancel } from '@/components/pages';

type SearchParams = Promise<{ orderId: string }>;

const Cancel = async ({ searchParams }: { searchParams: SearchParams }) => {
  const orderId = (await searchParams).orderId;

  return <SectionCancel orderId={orderId} />;
};

export default Cancel;
