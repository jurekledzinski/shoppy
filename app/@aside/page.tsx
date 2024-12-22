import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { getDomain } from '../_helpers';
import { cookies, headers } from 'next/headers';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';
import { UserRegister } from '@/models';
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

const secretGuest = process.env.GUEST_SECRET!;

const Aside = async () => {
  const session = await auth();
  const domain = await getDomain();
  const userHeaders = await headers();
  const cookieStore = await cookies();

  const guestCookie = cookieStore.get('guestId') ?? null;

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  const guestCookieDecoded = guestCookie
    ? await verifyToken(guestCookie.value, secretGuest)
    : null;

  //   console.log('guestId aside', guestCookieDecoded);

  return (
    <MainAside
      guestId={guestCookieDecoded ? guestCookieDecoded.payload : null}
      userData={resUser && resUser.success ? resUser.data : null}
    />
  );
};

export default Aside;
