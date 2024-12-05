import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { cookies } from 'next/headers';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProfile, getDomain } from '@/app/_helpers';
import { ProfileSection } from '@/components/pages';
import { UserRegister } from '@/models';

type Params = Promise<{ id: string }>;

const Profile = async (props: { params: Params }) => {
  const domain = await getDomain();
  const cookieStore = await cookies();
  const userSession = cookieStore.get('auth');
  const params = await props.params;
  const url = `${domain}/api/v1/get_user?id=${params.id}`;
  const response = await fetch(url, {
    headers: {
      Cookie: `auth=${userSession?.value}`,
    },
  });

  const userData = (await response.json()) as {
    payload: Omit<UserRegister, 'password'>;
    success: boolean;
  };

  const breadcrumbs = getBreadcrumbsProfile(params.id);

  return (
    <ProfileSection user={response.ok ? userData.payload : null}>
      <Breadcrumbs>
        {breadcrumbs.map((segment, index) => {
          return (
            <Breadcrumb
              key={segment.name}
              text={segment.name}
              path={segment.path}
              {...(index !== breadcrumbs.length - 1 && {
                icon: faChevronRight,
              })}
            />
          );
        })}
      </Breadcrumbs>
    </ProfileSection>
  );
};

export default Profile;
