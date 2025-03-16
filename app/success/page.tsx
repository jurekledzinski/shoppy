import { SectionSuccess } from '@/components/pages';
import {
  getAuthSecrets,
  getSessionData,
  verifyGuestUser,
  verifyStepper,
} from '@/lib';

type SearchParams = Promise<{ orderId: string }>;

const Success = async ({ searchParams }: { searchParams: SearchParams }) => {
  const orderId = (await searchParams).orderId;
  const AUTH = await getAuthSecrets();
  const { cookieGuest, cookieStepper, session } = await getSessionData();

  const guestCookieDecoded = await verifyGuestUser(
    cookieGuest!,
    AUTH.SECRET_GUEST
  );

  const stepperCookieDecoded = await verifyStepper(
    cookieStepper!,
    AUTH.SECRET_STEPPER
  );

  return (
    <SectionSuccess
      isGuestLogin={Boolean(guestCookieDecoded)}
      isStepperLogin={Boolean(stepperCookieDecoded)}
      isUserLogIn={Boolean(session)}
      orderId={orderId}
    />
  );
};

export default Success;
