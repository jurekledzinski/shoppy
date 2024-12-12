import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProfile, getDomain } from '@/app/_helpers';
import { headers } from 'next/headers';
import { ProfileSection } from '@/components/pages';
import { UserRegister } from '@/models';

type Params = Promise<{ id: string }>;

const Profile = async (props: { params: Params }) => {
  const domain = await getDomain();
  const params = await props.params;

  const url = `${domain}/api/v1/user?id=${params.id}`;

  const userHeaders = await headers();

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers: userHeaders,
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
