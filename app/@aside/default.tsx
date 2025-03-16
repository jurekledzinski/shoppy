import { Aside as MainAside } from '@/components/shared';
import { getAsidetData } from '@/lib';

const Aside = async () => {
  const { guestId, userData } = await getAsidetData();

  return (
    <MainAside
      guestId={guestId ? guestId : null}
      userData={userData ? userData : null}
    />
  );
};

export default Aside;
