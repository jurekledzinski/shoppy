import { Breadcrumb, Breadcrumbs } from '@/components/shared';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { getBreadcrumbsProfile, getDomain } from '@/helpers';
import { getSessionData, getUserData } from '@/lib';
import { ProfileSection } from '@/components/pages';

type Params = Promise<{ id: string }>;

const Profile = async (props: { params: Params }) => {
  const { session, headersData } = await getSessionData();
  const domain = await getDomain();
  const params = await props.params;

  const userData = await getUserData(session, domain, headersData);

  const breadcrumbs = getBreadcrumbsProfile(params.id);

  return (
    <ProfileSection userData={userData ? userData : null}>
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
