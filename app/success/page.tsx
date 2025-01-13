import { auth } from '@/auth';
import { cookies } from 'next/headers';
import { SectionSuccess } from '@/components/pages';
import { tokenVerify } from '../_helpers';

type SearchParams = Promise<{ orderId: string }>;

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const Success = async ({ searchParams }: { searchParams: SearchParams }) => {
  const orderId = (await searchParams).orderId;
  const session = await auth();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;
  const stepperCookie = cookieStore.get('stepper') ?? null;

  const guestCookieDecoded = guestCookie?.value
    ? await tokenVerify<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const stepperCookieDecoded = stepperCookie?.value
    ? await tokenVerify<{ value: { allowed: string; completed: string[] } }>(
        stepperCookie.value,
        secretStepper
      )
    : null;

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
