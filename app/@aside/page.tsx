import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { fetchUser, getDomain, tokenVerify } from '../_helpers';

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

  console.log('cookieStore aside', cookieStore);
  console.log('domain aside', domain);
  console.log('session aside', session);
  console.log('resUser aside', resUser);
  console.log('guestCookieDecoded aside', guestCookieDecoded);

  return (
    <MainAside
      guestId={guestCookieDecoded ? guestCookieDecoded.payload.value : null}
      userData={resUser && resUser.success ? resUser.data : null}
    />
  );
};

export default Aside;
