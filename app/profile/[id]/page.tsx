import { auth } from '@/auth';
import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProfile, getDomain } from '@/app/_helpers';
import { headers } from 'next/headers';
import { ProfileSection } from '@/components/pages';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';
import { UserRegister } from '@/models';

type Params = Promise<{ id: string }>;

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

const Profile = async (props: { params: Params }) => {
  const session = await auth();
  const domain = await getDomain();
  const params = await props.params;

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const userHeaders = await headers();
  const resUser = session ? await fetchUser(urlGetUser, userHeaders) : null;

  const breadcrumbs = getBreadcrumbsProfile(params.id);

  return (
    <ProfileSection userData={resUser && resUser.success ? resUser.data : null}>
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
