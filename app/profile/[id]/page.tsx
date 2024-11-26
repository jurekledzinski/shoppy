import { ProfileSection } from '@/components/pages';
import { UserRegister } from '@/models';
import { cookies, headers } from 'next/headers';

type Params = Promise<{ id: string }>;

const Profile = async (props: { params: Params }) => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const cookieStore = await cookies();
  const userSession = cookieStore.get('auth');
  const params = await props.params;
  const url = `${protocol}://${host}/api/v1/get_user?id=${params.id}`;
  const response = await fetch(url, {
    cache: 'force-cache',
    headers: {
      Cookie: `auth=${userSession?.value}`,
    },
    next: { tags: ['update-profile'] },
  });

  const userData = (await response.json()) as {
    payload: Omit<UserRegister, 'password'>;
    success: boolean;
  };

  console.log('userData page profile', userData);

  return <ProfileSection user={response.ok ? userData.payload : null} />;
};

export default Profile;
