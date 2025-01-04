import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { Cart, UserRegister } from '@/models';
import { cookies, headers } from 'next/headers';
import { getDomain } from '../_helpers';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';
import { verifyToken } from '@/lib';

const fetchUser = tryCatch<Omit<UserRegister, 'password' | 'email'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_user'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

const fetchCart = tryCatch<Omit<Cart, 'cartId'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_cart'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

const secretGuest = process.env.GUEST_SECRET!;

const Aside = async () => {
  const session = await auth();
  const domain = await getDomain();
  const allHeaders = await headers();
  const cookieStore = await cookies();

  const guestCookie = cookieStore.get('guestId') ?? null;

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, allHeaders) : null;

  const guestCookieDecoded = guestCookie
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
