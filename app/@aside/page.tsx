import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { fetchUser, tokenVerify } from '@/lib';
import { getDomain } from '@/helpers';

const secretGuest = process.env.GUEST_SECRET!;

const Aside = async () => {
  const session = await auth();
  const domain = await getDomain();
  const allHeaders = await headers();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, allHeaders) : null;

  const guestCookieDecoded = guestCookie?.value
    ? await tokenVerify<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  return (
    <MainAside
      guestId={guestCookieDecoded ? guestCookieDecoded.payload.value : null}
      userData={resUser && resUser.success ? resUser.data : null}
    />
  );
};

export default Aside;
