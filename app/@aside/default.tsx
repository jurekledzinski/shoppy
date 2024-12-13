import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';

const Aside = async () => {
  const session = await auth();

  console.log('aside session default', session);

  return <MainAside userData={session} />;
};

export default Aside;
