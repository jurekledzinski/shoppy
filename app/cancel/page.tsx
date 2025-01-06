// remove guestId i stepper jeśli zalogowany jako guest
// remove stepper jeśli zalogowany jako user
// show modal ask to clear cart or not if not extend stepper and guestId for 1hour

import { SectionCancel } from '@/components/pages';

type SearchParams = Promise<{ orderId: string }>;

const Cancel = async ({ searchParams }: { searchParams: SearchParams }) => {
  const orderId = (await searchParams).orderId;

  return <SectionCancel orderId={orderId} />;
};

export default Cancel;
