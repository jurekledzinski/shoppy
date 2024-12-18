import { auth } from '@/auth';
import { ShippingSection } from '@/components/pages';
import { tryCatch } from '@/helpers';
import { UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { headers } from 'next/headers';
import { getDomain } from '../_helpers';

type SearchParams = Promise<{ orderId: string }>;

const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
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

const Shipping = async (props: { searchParams: SearchParams }) => {
  const session = await auth();
  const domain = await getDomain();
  const searchParams = await props.searchParams;

  const orderId = searchParams.orderId;
  console.log('orderId', orderId);
  console.log('session shipping page', session);

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const userHeaders = await headers();

  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  return (
    <ShippingSection
      userData={resUser && resUser.success ? resUser.data : null}
    >
      Stepper
    </ShippingSection>
  );
};

export default Shipping;
