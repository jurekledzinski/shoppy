// fetch cart ok
// dodaj cart do order ok
// zmien isPaid na true w order także ok
// zmien ilość produktów kupionych w bazie danych i  revalidate tag by pobrało świeże dane ok
// usun cart z kolekcji carts dla danego userId albo guestId ok
// clear koszyk ok

import { auth } from '@/auth';
import { fetchCart, getDomain } from '../_helpers';
import { cookies, headers } from 'next/headers';
import { verifyToken } from '@/lib';
import { SectionSuccess } from '@/components/pages';

type SearchParams = Promise<{ orderId: string }>;

const secretGuest = process.env.GUEST_SECRET!;

const Success = async ({ searchParams }: { searchParams: SearchParams }) => {
  const orderId = (await searchParams).orderId;
  const session = await auth();
  const domain = await getDomain();
  const allHeaders = await headers();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;

  const guestCookieDecoded = guestCookie?.value
    ? await verifyToken<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const urlGetCart = `${domain}/api/v1/cart`;

  const resCart =
    session || guestCookieDecoded
      ? await fetchCart(urlGetCart, allHeaders)
      : null;

  return (
    <SectionSuccess
      cartData={resCart && resCart.success ? resCart.data : null}
      orderId={orderId}
    />
  );
};

export default Success;
