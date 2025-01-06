import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { fetchCart, fetchUser, getDomain } from '../_helpers';
import { verifyToken } from '@/lib';

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
    ? await verifyToken<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const urlGetCart = `${domain}/api/v1/cart`;

  const resCart =
    session || guestCookieDecoded
      ? await fetchCart(urlGetCart, allHeaders)
      : null;

  return (
    <MainAside
      cartData={resCart && resCart.success ? resCart.data : null}
      guestId={guestCookieDecoded ? guestCookieDecoded.payload.value : null}
      userData={resUser && resUser.success ? resUser.data : null}
    />
  );
};

export default Aside;
