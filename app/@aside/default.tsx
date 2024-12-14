import { Aside as MainAside } from '@/components/shared';
import { auth } from '@/auth';
import { getDomain } from '../_helpers';
import { headers } from 'next/headers';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';
import { UserRegister } from '@/models';

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

const Aside = async () => {
  const session = await auth();
  const domain = await getDomain();
  const userHeaders = await headers();
  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  return (
    <MainAside userData={resUser && resUser.success ? resUser.data : null} />
  );
};

export default Aside;
