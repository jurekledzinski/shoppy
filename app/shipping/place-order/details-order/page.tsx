import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { DetailsOrderSection } from '@/components/pages';
import { fetchOrder, getDomain } from '@/app/_helpers';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';
import { verifyToken } from '@/lib';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const DetailsOrder = async () => {
  const session = await auth();
  const domain = await getDomain();
  const headersFetch = await headers();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;
  const stepperCookie = cookieStore.get('stepper') ?? null;

  const guestCookieDecoded = guestCookie?.value
    ? await verifyToken<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const stepperCookieDecoded = stepperCookie?.value
    ? await verifyToken<{ value: { allowed: string; completed: string[] } }>(
        stepperCookie.value,
        secretStepper
      )
    : null;

  const urlGetOrder = `${domain}/api/v1/order`;
  const resOrder =
    guestCookieDecoded || session
      ? await fetchOrder(urlGetOrder, headersFetch)
      : null;

  const completedSteps = stepperCookieDecoded
    ? stepperCookieDecoded.payload.value.completed
    : [];

  return (
    <DetailsOrderSection
      orderData={resOrder && resOrder.success ? resOrder.data : null}
      guestSession={
        guestCookieDecoded ? guestCookieDecoded?.payload.value : null
      }
      userSession={session ? session.user.id : null}
    >
      <Stepper>
        {steps.map((step) => {
          return (
            <Step
              key={step.label}
              icon={step.icon}
              label={step.label}
              path={step.path}
              completed={completedSteps.includes(step.path)}
            />
          );
        })}
      </Stepper>
    </DetailsOrderSection>
  );
};

export default DetailsOrder;
